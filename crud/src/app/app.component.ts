import { Component } from '@angular/core';
import { SalesforceComponent } from './salesforce/salesforce.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // providers: [SalesforceComponent]
})
export class AppComponent {
  title = 'crud';
}
