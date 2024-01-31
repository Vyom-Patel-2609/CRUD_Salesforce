// salesforce.component.ts
import { Component, OnInit } from '@angular/core';
import { SalesforceService } from '../salesforce-service.service';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-salesforce',
  templateUrl: './salesforce.component.html',
  styleUrl: './salesforce.component.css',
  // providers: [SalesforceService]
})
export class SalesforceComponent implements OnInit {
  sObjects: string[] = [];
  selectedSObject: string = '';
  fields: string[]=[]
  urecordId: string='';
  drecordId: string='';
  fieldhash: { [fieldName: string]: boolean } = {};
  typehash: {[fieldName: string]: string}={}
  valuehash: {[fieldName: string]: string[]}={}
  selectedFields: string[] = [];
  records: any[] = [];
  update_select : boolean =false
  selectedrecord :any;
  flag : boolean = false;
  crecord: any
  fetchClicked:boolean = false;


  constructor(private salesforceService: SalesforceService) {}

  ngOnInit(): void {
    if(this.salesforceService.accessToken!=='') this.getSObjects();
  }

  getSObjects(): void {
    this.salesforceService.getSObjects().subscribe((data) => {
      this.sObjects = data.sobjects.map((sobject: any) => sobject.name);
    });
  }
  
  getFields(): void {
    this.change_flags()
    console.log(this.selectedSObject)
    if (this.selectedSObject) {
      this.salesforceService
        .getObjectFields(this.selectedSObject)
        .subscribe((data) => {
          this.fields = data.fields.map((field: any) => field.name);
          data.fields.forEach((field: any) => {
            this.fieldhash[field.name] = field.updateable;
            this.typehash[field.name]=field.type
            if(field.type=='picklist'){
              const drop = field.picklistValues.map((data:any)=> data.value)
              this.valuehash[field.name]=drop;
            }
          });
        });
    }
  }


  // getFieldNames(){
  //   return Object.keys(this.fields);
  // }
  change_flags(){
    this.fetchClicked=false;
    this.update_select=false;
    this.urecordId=''
  }
  fetchData(): void {
    // console.log(this.fieldhash)
    console.log(this.valuehash)
    this.update_select=false;
    if (this.selectedSObject && this.selectedFields.length > 0) {
      this.salesforceService
        .getObjectData(this.selectedSObject, this.selectedFields)
        .subscribe((data) => {
          this.records = data.records;
        });
    }
    this.fetchClicked=true;
  }

  updateRecord(record: any): void {
      this.update_select=!this.update_select
      this.urecordId=record['Id']
      // console.log(this.recordId)
      this.selectedrecord = Object.keys(record).reduce((result, fieldName) => {
        if (this.fieldhash[fieldName]) {
          result[fieldName] = record[fieldName];
        }
        return result;
      }, {});

      this.crecord={...record};
      console.log(this.selectedrecord)
  }

  finalUpdate(updatedData:any){
    console.log(this.urecordId)
    this.salesforceService.updateObjectRecord(this.selectedSObject, this.urecordId, updatedData)
        .subscribe((data) => {
          alert('Record updated successfully:');
          // Refresh data after updating
          this.fetchData();
        });
    this.update_select=!this.update_select
  }

  deleteRecord(record: any): void {
    this.drecordId = record['Id']
    console.log(this.drecordId)
    if (this.selectedSObject) {
      this.salesforceService
        .deleteObjectRecord(this.selectedSObject, this.drecordId)
        .pipe(
          catchError(error => {
            alert('This record cannot be deleted')
            return EMPTY
          })
        )
        .subscribe((data) => {
          alert('Record deleted successfully:');
          // Refresh data after deleting
          this.fetchData();
        });
    }
  }
}
