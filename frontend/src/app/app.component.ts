import { Component, OnInit } from '@angular/core'
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public phoneMenuIsOpen:boolean = false;
    public panelOpenState = false;
    public title = 'Gestarmory App';

    constructor(private oauthService: OAuthService){}

    message!: string;

    ngOnInit(): void {
    }

    get token(){
      let claims:any = this.oauthService.getIdentityClaims();
      return claims ? claims : null;
    }

    toggleMenu() {
      this.phoneMenuIsOpen = !this.phoneMenuIsOpen;
    }

    logout(){
      this.oauthService.revokeTokenAndLogout();
    }

  }
