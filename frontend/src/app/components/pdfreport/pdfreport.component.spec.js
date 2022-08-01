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
const forms_1 = require("@angular/forms");
const core_1 = require("@angular/material/core");
const dialog_1 = require("@angular/material/dialog");
const snack_bar_1 = require("@angular/material/snack-bar");
const pdfreport_component_1 = require("./pdfreport.component");
describe('PdfreportComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpClientModule, dialog_1.MatDialogModule, forms_1.FormsModule],
            declarations: [pdfreport_component_1.PdfreportComponent],
            providers: [snack_bar_1.MatSnackBar, overlay_1.Overlay, core_1.DateAdapter, dialog_1.MatDialog, { provide: dialog_1.MAT_DIALOG_DATA, useValue: [] }, { provide: dialog_1.MatDialogRef, useValue: [] }]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(pdfreport_component_1.PdfreportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    // it('should create', () => {
    //   expect(component).toBeTruthy();
    // });
});
