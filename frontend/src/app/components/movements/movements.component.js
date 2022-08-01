"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovementsComponent = void 0;
const core_1 = require("@angular/core");
const movement_1 = require("../../models/movement");
const movements_service_1 = require("../../services/movements.service");
const products_service_1 = require("../../services/products.service");
const createmovement_component_1 = require("../createmovement/createmovement.component");
const pdfreport_component_1 = require("../pdfreport/pdfreport.component");
const jspdf_1 = __importDefault(require("jspdf"));
require("jspdf-autotable");
const jspdf_autotable_1 = __importDefault(require("jspdf-autotable"));
const paginator_1 = require("@angular/material/paginator");
const table_1 = require("@angular/material/table");
const sort_1 = require("@angular/material/sort");
const products_model_1 = require("../../models/products.model");
const forms_1 = require("@angular/forms");
let MovementsComponent = class MovementsComponent {
    constructor(oauthService, _movementService, _productsService, _snackBar, dialog, router) {
        this.oauthService = oauthService;
        this._movementService = _movementService;
        this._productsService = _productsService;
        this._snackBar = _snackBar;
        this.dialog = dialog;
        this.router = router;
        this.horizontalPosition = 'center';
        this.verticalPosition = 'top';
        this.movements = [];
        this.editIndex = "";
        this.products = [];
        this.editMode = false;
        this.movesCounter = 0;
        this._date = new Date();
        this.tooltip = new forms_1.FormControl(true);
        this.displayedColumns = ['seatNumber', 'date', 'product', 'guide', 'client', 'stock', 'report', 'edit', 'remove'];
        this.dataSource = new table_1.MatTableDataSource(this.movements);
        this.movement = new movement_1.Movement('', 0, this._date, '', '', '', 0);
        this.product = new products_model_1.Product('', '', 0);
    }
    ngOnInit() {
        this.getMovements();
        this._productsService.getProducts().subscribe((result => {
            this.products = result.products;
        }));
        var tooltipState = localStorage.getItem('movementsColourTooltip');
        if (tooltipState == 'false') {
            this.tooltip.setValue(false);
        }
        else {
            this.tooltip.setValue(true);
        }
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    get token() {
        const claims = this.oauthService.getIdentityClaims();
        return claims ? claims : null;
    }
    ApplyFilter(event) {
        const filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    NewMovementDialog() {
        this.openSnackBar("Select a client with double click.", "OK");
        this.router.navigate(['/clients']);
    }
    GenerateReport(selectedRow) {
        const dialogRef = this.dialog.open(pdfreport_component_1.PdfreportComponent, {
            width: '400px',
            data: { _movement: selectedRow },
        });
        dialogRef.afterClosed().subscribe(result => {
            this.movement = result;
            this.editMode = false;
            this.getMovements();
        });
    }
    EditRowClick(selectedRow) {
        this.editMode = true;
        const dialogRef = this.dialog.open(createmovement_component_1.CreatemovementComponent, {
            width: '400px',
            data: { _movement: selectedRow, editMode: this.editMode },
        });
        dialogRef.afterClosed().subscribe(result => {
            this.movement = result;
            this.editMode = false;
            this.getMovements();
        });
    }
    TooltipClicked() {
        if (this.tooltip.value == true) {
            localStorage.setItem('movementsColourTooltip', 'false');
        }
        else {
            localStorage.setItem('movementsColourTooltip', 'true');
        }
    }
    getMovements() {
        this._movementService.getMovements().subscribe((response) => {
            if (response.movements) {
                this.movements = response.movements;
                this.dataSource.data = response.movements;
            }
            else {
                console.log("Cant load the movements");
            }
            (error) => {
                console.log(error);
            };
        });
    }
    DeleteMovement(id) {
        //TODO Replace confirm alert with a dialog material
        if (confirm("Are you sure you want to delete this client?")) {
            this._movementService.deleteMovement(id).subscribe((response) => {
                if (response.movement) {
                    this.getMovements();
                    this.openSnackBar("Movement removed succesfully.", "OK");
                }
            });
        }
        ;
    }
    ExportToPDF() {
        let PDF = new jspdf_1.default();
        var img = new Image();
        img.src = 'assets/img/logo.png';
        PDF.addImage(img, 'png', 14, 2, 30, 11);
        PDF.setFontSize(15);
        (0, jspdf_autotable_1.default)(PDF, { html: '#htmlData' });
        PDF.text('Movements List', 80, 9);
        PDF.output('dataurlnewwindow');
    }
    openDeleteSnackBar(message, action) {
        this._snackBar.open(message, action, {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000,
            panelClass: ['blue-snackbar'],
        });
    }
    openSnackBar(message, action) {
        this._snackBar.open(message, action, {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000,
            panelClass: ['blue-snackbar'],
        });
    }
    GetSeatNumber() {
        this._movementService.getMovements().subscribe((result => {
            if (result) {
                for (let index = 0; index < result.movements.length; index++) {
                    const value = result.movements[index].seatNumber;
                    console.log(value);
                    if (value > this.movesCounter) {
                        this.movesCounter = value;
                    }
                }
            }
            console.log("New seat:  " + this.movesCounter);
        }));
    }
    LoadMovementsFromFakeAPI() {
        this.movement = new movement_1.Movement('', 0, this._date, '', '', '', 0);
        this._movementService.FetchMovements().subscribe((response) => {
            if (response) {
                //this.GetSeatNumber();
                for (let index = 0; index < response.users.length; index++) {
                    const user = response.users[index];
                    const randomProduct = this.products[Math.floor(Math.random() * this.products.length)].name;
                    const stock = [-50, 50, 75, 85, 80, -100, -125, 150, -200];
                    const randomStock = Math.floor(Math.random() * stock.length);
                    this.movesCounter = this.movesCounter + 1;
                    this.movement.seatNumber = this.movesCounter;
                    this.movement.date = this._date;
                    this.movement.guide = user.bank.iban;
                    this.movement.product = randomProduct;
                    this.movement.client = user.firstName + " " + user.maidenName + " " + user.lastName + " " + user.bank.cardNumber;
                    this.movement.stock = stock[randomStock];
                    // if (income[randomIncome] == 0){
                    //   this.movement.income = 0;
                    //   this.movement.outcome = outcome[randomOutcome];
                    // }else{
                    //   this.movement.outcome = 0;
                    //   this.movement.income = income[randomIncome];
                    // }
                    if (this.movement.stock == null) {
                        this.movement.stock = 1000;
                    }
                    this._movementService.addNewmovement(this.movement).subscribe(() => {
                        this.getMovements();
                        this.openSnackBar('Movements loaded', 'OK');
                    });
                }
            }
            else {
                console.log("CAN'T LOAD THE USERS FROM THE FAKE API");
            }
        });
    }
    DeleteALLMovements() {
        if (confirm("Are you sure you want to delete ALL the clients?")) {
            this._movementService.getMovements().subscribe((response) => {
                if (response) {
                    for (let index = 0; index < response.movements.length; index++) {
                        const movement = response.movements[index];
                        this._movementService.deleteMovement(movement._id).subscribe(() => {
                            this.getMovements();
                            this.openSnackBar('All the movements have been deleted.', 'OK');
                        });
                    }
                }
            });
        }
    }
};
__decorate([
    (0, core_1.ViewChild)('htmlData')
], MovementsComponent.prototype, "htmlData", void 0);
__decorate([
    (0, core_1.ViewChild)(paginator_1.MatPaginator)
], MovementsComponent.prototype, "paginator", void 0);
__decorate([
    (0, core_1.ViewChild)(sort_1.MatSort)
], MovementsComponent.prototype, "sort", void 0);
MovementsComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-movements',
        templateUrl: './movements.component.html',
        styleUrls: ['./movements.component.css'],
        providers: [movements_service_1.MovementsService, products_service_1.ProductsService]
    })
], MovementsComponent);
exports.MovementsComponent = MovementsComponent;
