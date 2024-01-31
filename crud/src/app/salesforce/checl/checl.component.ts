import { Component, inject } from '@angular/core';
import { SalesforceService } from '../../salesforce-service.service';

@Component({
  selector: 'app-checl',
  templateUrl: './checl.component.html',
  styleUrl: './checl.component.css'
})
export class CheclComponent {
  // serviceInstance: SalesforceService
  // constructor(){
  //   this.serviceInstance=inject(SalesforceService)
  // }
  constructor(private serviceInstance: SalesforceService){}
  saveData: string[]=[];
  ngOnInit(){
    this.serviceInstance.getSObjects().subscribe((data)=>{
      this.saveData = data.sobjects.map((object)=>{
        return object.name
      })
    })
  }
}
