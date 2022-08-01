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
const overlay_1 = require("@angular/cdk/overlay");
const http_1 = require("@angular/common/http");
const testing_1 = require("@angular/core/testing");
const dialog_1 = require("@angular/material/dialog");
const snack_bar_1 = require("@angular/material/snack-bar");
const testing_2 = require("@angular/router/testing");
const angular_oauth2_oidc_1 = require("angular-oauth2-oidc");
const rxjs_1 = require("rxjs");
const movements_component_1 = require("./movements.component");
describe('MovementsComponent', () => {
    let component;
    let fixture;
    const mockMovementsService = jasmine.createSpyObj('MovementsService', ['getMovements']);
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpClientModule, dialog_1.MatDialogModule, testing_2.RouterTestingModule],
            declarations: [movements_component_1.MovementsComponent],
            providers: [angular_oauth2_oidc_1.OAuthLogger, angular_oauth2_oidc_1.OAuthService, angular_oauth2_oidc_1.UrlHelperService, dialog_1.MatDialog, angular_oauth2_oidc_1.DateTimeProvider, snack_bar_1.MatSnackBar, overlay_1.Overlay, dialog_1.MatDialogModule, { provide: dialog_1.MAT_DIALOG_DATA, useValue: [] }, { provide: dialog_1.MatDialogRef, useValue: [] }]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(movements_component_1.MovementsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('check fetch fake movements', () => {
        spyOn(component, 'LoadMovementsFromFakeAPI');
        component.LoadMovementsFromFakeAPI();
        expect(component.LoadMovementsFromFakeAPI).toHaveBeenCalledTimes(1);
    });
    it(`#getmovements should return a collection of movements`, () => __awaiter(void 0, void 0, void 0, function* () {
        const movement = {
            _id: '62d6b6a6d38a7a5548fd7836',
            seatNumber: 1,
            date: new Date("2000-12-25T00:00:00.000+00:00"),
            product: 'Metalica',
            guide: 'NO17 0695 2754 967',
            client: 'Terry Smitham Medhurst 50380955204220685',
            stock: 80
        };
        mockMovementsService.getMovements.and.returnValue((0, rxjs_1.of)(movement));
        mockMovementsService.getMovements().subscribe(response => {
            expect(response).toEqual(movement);
        });
    }));
    it('should not display the page if not logged in', () => {
        expect(fixture.debugElement.nativeElement.querySelector('#loginMessage').innerHTML).toBeTruthy();
    });
});
