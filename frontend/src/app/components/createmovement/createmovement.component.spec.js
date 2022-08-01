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
const createmovement_component_1 = require("./createmovement.component");
const movements_service_1 = require("../../services/movements.service");
const http_1 = require("@angular/common/http");
const overlay_1 = require("@angular/cdk/overlay");
const core_1 = require("@angular/material/core");
const dialog_1 = require("@angular/material/dialog");
const forms_1 = require("@angular/forms");
const snack_bar_1 = require("@angular/material/snack-bar");
describe('CreatemovementComponent', () => {
    let component;
    let fixture;
    let debugElement;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpClientModule, dialog_1.MatDialogModule, forms_1.FormsModule],
            declarations: [createmovement_component_1.CreatemovementComponent],
            providers: [overlay_1.Overlay, movements_service_1.MovementsService, snack_bar_1.MatSnackBar, core_1.DateAdapter, dialog_1.MatDialog, { provide: dialog_1.MAT_DIALOG_DATA, useValue: [] }, { provide: dialog_1.MatDialogRef, useValue: [] }]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(createmovement_component_1.CreatemovementComponent);
        component = fixture.componentInstance;
        //debugElement = fixture.debugElement;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    // it(`seat number bigger than 0`, async () =>{
    //   //spyOn(component, 'GetNewSeatNumber');
    //   //component.GetNewSeatNumber();
    //   //expect(component.GetNewSeatNumber).toHaveBeenCalledTimes(1);
    //   //const value = fixture.debugElement.nativeElement.querySelector('#seatnumber');
    //   fixture.detectChanges();
    //   expect(component.movement.seatNumber).toBeGreaterThan(0);
    //   //expect(value.innerHTML).toBeGreaterThan(0);
    // })
});
