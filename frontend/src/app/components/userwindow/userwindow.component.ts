import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-userwindow',
  templateUrl: './userwindow.component.html',
  styleUrls: ['./userwindow.component.css']
})

export class UserwindowComponent implements OnInit {

  public panelOpenState = false;

  constructor(
    private _appComponent : AppComponent,
    private oauthService:OAuthService
  ) {
    this.panelOpenState = _appComponent.panelOpenState;
  }

  ngOnInit(): void {
  }

  get token(){
    let claims:any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }

  logout(){
    this.oauthService.revokeTokenAndLogout();
  }
}
