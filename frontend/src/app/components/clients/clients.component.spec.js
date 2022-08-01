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
const clients_component_1 = require("./clients.component");
const angular_oauth2_oidc_1 = require("angular-oauth2-oidc");
const snack_bar_1 = require("@angular/material/snack-bar");
const overlay_1 = require("@angular/cdk/overlay");
const dialog_1 = require("@angular/material/dialog");
const rxjs_1 = require("rxjs");
const testing_2 = require("@angular/common/http/testing");
describe('ClientsComponent', () => {
    let component;
    let fixture;
    let debugElement;
    let httpMock;
    const mockClientsComponent = jasmine.createSpyObj('ClientsComponent', ['NewClient']);
    const mockClientsService = jasmine.createSpyObj('ClientsService', ['FetchClients']);
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            declarations: [clients_component_1.ClientsComponent],
            imports: [http_1.HttpClientModule, dialog_1.MatDialogModule],
            providers: [
                testing_2.HttpTestingController,
                { provide: clients_component_1.ClientsComponent, value: mockClientsComponent },
                angular_oauth2_oidc_1.OAuthLogger,
                angular_oauth2_oidc_1.OAuthService,
                angular_oauth2_oidc_1.UrlHelperService,
                dialog_1.MatDialog,
                angular_oauth2_oidc_1.DateTimeProvider,
                snack_bar_1.MatSnackBar,
                overlay_1.Overlay,
                dialog_1.MatDialogModule,
                { provide: dialog_1.MAT_DIALOG_DATA, useValue: [] },
                { provide: dialog_1.MatDialogRef, useValue: [] }
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(clients_component_1.ClientsComponent);
        httpMock = testing_1.TestBed.inject(testing_2.HttpTestingController);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should fetch the fake clients', () => {
        //spyOn(component, 'LoadClientsFromFakeAPI');
        //component.LoadClientsFromFakeAPI();
        //expect(component.fakeClientsLoaded).toBe(true);
        //expect(component.LoadClientsFromFakeAPI).toHaveBeenCalledTimes(1);
        //expect(mockClientsService.FetchClients).toBeDefined;
        const client = {
            _id: '62de56750ab137ff1c3b1dde',
            dni: '50380955204220685',
            name: 'Terry Smitham Medhurst',
            address: '1745 T Street Southeast',
            city: 'Washington',
            province: 'Washington',
            guide: 'NO17 0695 2754 967',
            guideexpeditiondate: new Date("2000-12-25T00:00:00.000+00:00")
        };
        mockClientsService.FetchClients.and.returnValue((0, rxjs_1.of)(client));
        mockClientsService.FetchClients().subscribe(response => {
            expect(response).toEqual(client);
        });
    });
    it('should not display the page if not logged in', () => {
        expect(fixture.debugElement.nativeElement.querySelector('#loginMessage').innerHTML).toBeTruthy();
    });
});
