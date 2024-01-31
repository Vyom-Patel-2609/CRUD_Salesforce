// salesforce.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesforceService {
  private baseUrl = 'https://AP25.salesforce.com/services/data/v58.0';
  constructor(private http: HttpClient) {}

  accessToken:string
   
  setAccessToken(access: string){
    this.accessToken = access;
  }
  // accessToken = '00D5h000009A18S!AQIAQHKLIAqbsMq3hkW.LBttn9gmMXUrsrsPW4lCxvQ7Tmo_HVOe.OiELRzG4B_HpmC9qaIAl3oAx7p6IUrOc69zZzFHAu8b'; // Replace with your Salesforce access token
  private getHeaders(): HttpHeaders {

    // Set headers for Salesforce API requests
    return new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });
  }
  
  // Get a list of SObjects
  getSObjects(): Observable<any> {
    const url = `${this.baseUrl}/sobjects`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  // Get fields of a specific SObject
  getObjectFields(sObjectName: string): Observable<any> {
    const url = `${this.baseUrl}/sobjects/${sObjectName}/describe`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  // Get records of a specific SObject based on selected fields
  getObjectData(sObjectName: string, selectedFields: string[]): Observable<any> {
    //console.log(selectedFields)
    //const fieldsString = selectedFields.join(',');
    //console.log(selectedFields)
    const newFields : string[] =JSON.parse(JSON.stringify(selectedFields))
    if(!newFields.includes('Id')){
        newFields.push('Id')
    }
    // console.log(selectedFields)
    // console.log(newFields)
    const url = `${this.baseUrl}/query?q=SELECT+${newFields}+FROM+${sObjectName}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  // Update a record in a specific SObject
  updateObjectRecord(sObjectName: string, recordId: string, updatedData: any): Observable<any> {
    console.log(updatedData,recordId)
    const url = `${this.baseUrl}/sobjects/${sObjectName}/${recordId}`;
    return this.http.patch<any>(url, updatedData, { headers: this.getHeaders() });
  }

  // Delete a record in a specific SObject
  deleteObjectRecord(sObjectName: string, recordId: string): Observable<any> {
    const url = `${this.baseUrl}/sobjects/${sObjectName}/${recordId}`;
    return this.http.delete<any>(url, { headers: this.getHeaders() });
  }
}

  