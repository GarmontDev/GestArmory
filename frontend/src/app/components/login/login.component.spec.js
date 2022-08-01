"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const http_1 = require("@angular/common/http");
const login_component_1 = require("./login.component");
const app_component_1 = require("../../app.component");
const angular_oauth2_oidc_1 = require("angular-oauth2-oidc");
const testing_2 = require("@angular/router/testing");
const forms_1 = require("@angular/forms");
describe('LoginComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpClientModule, testing_2.RouterTestingModule, forms_1.FormsModule],
            declarations: [login_component_1.LoginComponent],
            providers: [
                angular_oauth2_oidc_1.OAuthLogger,
                angular_oauth2_oidc_1.OAuthService,
                angular_oauth2_oidc_1.UrlHelperService,
                angular_oauth2_oidc_1.DateTimeProvider,
                app_component_1.AppComponent,
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(login_component_1.LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should display the login button if not logged in', () => {
        expect(fixture.debugElement.nativeElement.querySelector('#loginButton').innerHTML).toBeTruthy();
    });
    it('should check log in button', () => {
        spyOn(component, 'login');
        fixture.nativeElement.querySelector('#loginButton').click();
        expect(component.login).toHaveBeenCalledTimes(1);
    });
});
