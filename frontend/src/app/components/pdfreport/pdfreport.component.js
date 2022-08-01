"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfreportComponent = void 0;
const core_1 = require("@angular/core");
const dialog_1 = require("@angular/material/dialog");
const common_1 = require("@angular/common");
const jspdf_1 = __importDefault(require("jspdf"));
require("jspdf-autotable");
const jspdf_autotable_1 = __importDefault(require("jspdf-autotable"));
let PdfreportComponent = class PdfreportComponent {
    constructor(dialogRef, dialog, data, datePipe) {
        this.dialogRef = dialogRef;
        this.dialog = dialog;
        this.data = data;
        this.datePipe = datePipe;
    }
    ngOnInit() {
        this.myDate = this.datePipe.transform(this.data._movement.date, 'dd/MM/yyyy');
    }
    ngAfterViewInit() {
        this.ExportToPDF();
        this.dialogRef.close();
    }
    ExportToPDF() {
        let PDF = new jspdf_1.default();
        var img = new Image();
        img.src = 'assets/img/logo.png';
        PDF.addImage(img, 'png', 14, 2, 30, 11);
        PDF.setFontSize(15);
        (0, jspdf_autotable_1.default)(PDF, { html: '#reportData' });
        PDF.text('Income/Outcome Report', 80, 9);
        PDF.output('dataurlnewwindow');
    }
};
PdfreportComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-pdfreport',
        templateUrl: './pdfreport.component.html',
        styleUrls: ['./pdfreport.component.css'],
        providers: [common_1.DatePipe]
    }),
    __param(2, (0, core_1.Inject)(dialog_1.MAT_DIALOG_DATA))
], PdfreportComponent);
exports.PdfreportComponent = PdfreportComponent;
