import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../services/users.service";
import { User } from "../../models/user.model";
import { FormsModule } from '@angular/forms';
import { Form } from '@angular/forms';
import { Router } from "@angular/router";
import { AppComponent } from "../../app.component";
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authConfig } from './sso.config';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsersService],
})
export class LoginComponent implements OnInit {
  public user: User;
  public logInfo: String = '';
  public isLogged: boolean = false;

  constructor(
    private _userService: UsersService,
    private _appComponent: AppComponent,
    private oauthService:OAuthService,
    private router: Router
  ) {
    this.user = new User('','','');
    this.configureSingleSignOn();
  }

  ngOnInit(): void {
  }

  configureSingleSignOn(){
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.getAccessToken();
    //this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  login() {
    this.oauthService.initLoginFlow();
    //this.oauthService.initLoginFlowInPopup();
  }

  get token(){
    const claims:any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }

  startDemo(){
    this.router.navigate(['/', 'clients']);
  }
}
