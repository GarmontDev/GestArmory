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
const userwindow_component_1 = require("./userwindow.component");
const app_component_1 = require("../../app.component");
const http_1 = require("@angular/common/http");
const angular_oauth2_oidc_1 = require("angular-oauth2-oidc");
describe('UserwindowComponent', () => {
    let component;
    let fixture;
    let appComponent;
    let mockAppComponent = {};
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            declarations: [userwindow_component_1.UserwindowComponent, app_component_1.AppComponent],
            imports: [http_1.HttpClientModule],
            providers: [angular_oauth2_oidc_1.OAuthLogger, angular_oauth2_oidc_1.OAuthService, angular_oauth2_oidc_1.UrlHelperService, angular_oauth2_oidc_1.DateTimeProvider, app_component_1.AppComponent,
                { provide: appComponent, useValue: mockAppComponent } // provide the mock.
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(userwindow_component_1.UserwindowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    // it('should create', () => {
    //   expect(component).toBeTruthy();
    // });
});
