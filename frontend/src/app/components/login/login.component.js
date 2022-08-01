"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginComponent = void 0;
const core_1 = require("@angular/core");
const users_service_1 = require("../../services/users.service");
const user_model_1 = require("../../models/user.model");
const angular_oauth2_oidc_jwks_1 = require("angular-oauth2-oidc-jwks");
const sso_config_1 = require("./sso.config");
let LoginComponent = class LoginComponent {
    constructor(_userService, _appComponent, oauthService, router) {
        this._userService = _userService;
        this._appComponent = _appComponent;
        this.oauthService = oauthService;
        this.router = router;
        this.logInfo = '';
        this.isLogged = false;
        this.user = new user_model_1.User('', '', '');
        this.configureSingleSignOn();
    }
    ngOnInit() {
    }
    configureSingleSignOn() {
        this.oauthService.configure(sso_config_1.authConfig);
        this.oauthService.tokenValidationHandler = new angular_oauth2_oidc_jwks_1.JwksValidationHandler();
        this.oauthService.loadDiscoveryDocumentAndTryLogin();
        this.oauthService.getAccessToken();
        //this.oauthService.loadDiscoveryDocumentAndLogin();
    }
    login() {
        this.oauthService.initLoginFlow();
        //this.oauthService.initLoginFlowInPopup();
    }
    get token() {
        const claims = this.oauthService.getIdentityClaims();
        return claims ? claims : null;
    }
    startDemo() {
        this.router.navigate(['/', 'clients']);
    }
};
LoginComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css'],
        providers: [users_service_1.UsersService],
    })
], LoginComponent);
exports.LoginComponent = LoginComponent;
