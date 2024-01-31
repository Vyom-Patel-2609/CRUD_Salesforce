import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  ngOnInit(): void {
    this.onSubmit();
  }

  onSubmit(){
    const salesforceLoginUrl = 'https://valorxindiaprivatelimited-dev-ed.develop.lightning.force.com/';
    const clientId = '3MVG95mg0lk4batiAkkSgEPGRZu_WOt2hSumH2GRl8j0WVtqbNX0DK26g0xechQWeCm6tHVzgulCqDhIq8YU4';
    const redirectUri = 'http://localhost:4200/';
    
    // Construct the OAuth URL
    const oauthUrl = `${salesforceLoginUrl}/services/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
    const oauthWindow = (window.location.href=oauthUrl)

    // Open a new window for Salesforce login
    //const oauthWindow = window.open(oauthUrl, '_blank', 'width=600,height=400');
  }  
}
