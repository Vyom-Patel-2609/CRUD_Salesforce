import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesforceService } from '../salesforce-service.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrl: './token.component.css',
})
export class TokenComponent {
  constructor(
    private route: ActivatedRoute,
    private salesforceService: SalesforceService,
    private router: Router
  ) {}

    accessToken: string
  ngOnInit(): void {
    // Subscribe to the route fragment
    const fragment = window.location.hash.substring(1); // Exclude the '#' character

    if (fragment) {
      // Decode the fragment and extract the access token
      const decodedFragment = decodeURIComponent(fragment);
      const accessTokenMatch = decodedFragment.match(/access_token=([^&]+)/);

      if (accessTokenMatch) {
        this.accessToken = accessTokenMatch[1];
        console.log('Access Token:', this.accessToken);
        this.salesforceService.setAccessToken(this.accessToken)
        // window.close();
        //window.opener.location.href = '/salesforce';
        // You can now use this.accessToken as needed
        this.router.navigate(['/salesforce'])
        //window.opener.postMessage({ accessToken: this.accessToken, action: 'closeAndRedirect' }, '*');
      }
    }
  }

  // @HostListener('window:message', ['$event'])
  // onMessage(event: MessageEvent): void {
  //   // Check if the message contains an 'action' property
  //   if (event.data && event.data.action === 'closeAndRedirect') {
  //     // Close the current window
  //     window.close();

  //     // Redirect the opener window to '/salesforcepath'
  //     window.opener.location.href = '/salesforce';
  //   }
  // }

  ngOnDestroy(){
    // this.router.navigate(['/salesforce']);
  }
}
