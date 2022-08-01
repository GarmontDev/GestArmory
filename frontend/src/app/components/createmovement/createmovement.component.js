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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatemovementComponent = void 0;
const core_1 = require("@angular/core");
const client_1 = require("../../models/client");
const movement_1 = require("../../models/movement");
const movements_service_1 = require("../../services/movements.service");
const clients_service_1 = require("../../services/clients.service");
const products_model_1 = require("../../models/products.model");
const products_service_1 = require("../../services/products.service");
const dialog_1 = require("@angular/material/dialog");
let CreatemovementComponent = class CreatemovementComponent {
    constructor(_movementsService, _productsService, _clientsService, _snackBar, dateAdapter, dialogRef, dialog, data) {
        this._movementsService = _movementsService;
        this._productsService = _productsService;
        this._clientsService = _clientsService;
        this._snackBar = _snackBar;
        this.dateAdapter = dateAdapter;
        this.dialogRef = dialogRef;
        this.dialog = dialog;
        this.data = data;
        this.clients = [];
        this.products = [];
        this.errorInfo = '';
        this._date = new Date();
        this.radioPosition = 'outcome';
        this.editMode = false;
        this.horizontalPosition = 'center';
        this.verticalPosition = 'top';
        this.movement = new movement_1.Movement('', 0, this._date, '', '', '', 0);
        this.product = new products_model_1.Product('', '', 0);
        this.client = new client_1.Client('', '', '', '', '', '', '', this._date);
        this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    }
    ngOnInit() {
        this.GetProducts();
        this.LoadClients();
    }
    ngAfterContentInit() {
        if (this.data.editMode) {
            this.editMode = true;
            this.LoadMovementData();
        }
        else {
            this.editMode = false;
            this.NewMovement();
        }
    }
    NewMovement() {
        this._movementsService.getMovements().subscribe((response) => {
            if (response.movements) {
                //var newSeat = (Object.keys(response.movements).length+1);
                //this.movement.seatNumber = newSeat
                this.GetNewSeatNumber();
                this.movement.date = this._date;
                this.movement.client = this.data._client.name + " " + this.data._client.dni;
                this.movement.guide = this.data._client.guide;
            }
            else {
                console.log("Cant load the movements");
            }
            (error) => {
                console.log(error);
            };
        });
    }
    LoadClients() {
        this._clientsService.getClients().subscribe((result) => {
            if (result) {
                this.clients = result.clients;
            }
            else {
                this.OpenSnackBar("There are no clients available, please create one", "OK");
            }
        });
    }
    GetProducts() {
        this._productsService.getProducts().subscribe((result) => {
            if (result) {
                this.products = result.products;
            }
            else {
                this.OpenSnackBar("There are no products available, please create one", "OK");
            }
        });
    }
    CheckSeatNumber(seat) {
        this._movementsService.getMovements().subscribe((result) => {
            for (let index = 0; index < result.movements.length; index++) {
                const element = result.movements[index];
                if (element.seatNumber == seat) {
                    this.errorInfo = "* Already exist";
                    return;
                }
                else {
                    this.errorInfo = "";
                }
            }
        });
    }
    GetNewSeatNumber() {
        var highest = 0;
        this._movementsService.getMovements().subscribe((result) => {
            for (let index = 0; index < result.movements.length; index++) {
                var seat = result.movements[index].seatNumber;
                if (Number(seat) > highest) {
                    highest = seat;
                }
            }
            highest = Number(highest) + 1;
            this.movement.seatNumber = highest;
        });
    }
    CreateMovement() {
        this._movementsService.addNewmovement(this.movement).subscribe((result) => {
            if (result) {
                this.UpdateStock();
            }
            else {
                this.OpenSnackBar("An error ocurred, please contact your support team", "OK");
            }
        });
        this.editMode = false;
        this.dialogRef.close();
    }
    UpdateStock() {
        this._productsService.getProducts().subscribe((result) => {
            for (let index = 0; index < result.products.length; index++) {
                const element = result.products[index];
                if (element.name == this.movement.product) {
                    this.product._id = element._id;
                    this.product.name = element.name;
                    this.product.stock = (element.stock + this.movement.stock);
                    this._productsService.updateProduct(this.product).subscribe(response => {
                        this.OpenSnackBar("Movement added succesfully.", "OK");
                    });
                }
            }
        });
    }
    UpdateMovement() {
        this._movementsService.updateMovement(this.movement).subscribe((response) => {
            if (response) {
                this.OpenSnackBar("Movement updated succesfully.", "OK");
            }
            else {
                this.OpenSnackBar("There was a problem updating the movement.", "OK");
            }
        });
        this.editMode = false;
        this.dialogRef.close();
    }
    LoadMovementData() {
        this.movement._id = this.data._movement._id;
        this.movement.seatNumber = this.data._movement.seatNumber;
        this.movement.date = this.data._movement.date;
        this.movement.client = this.data._movement.client;
        this.movement.guide = this.data._movement.guide;
        this.movement.product = this.data._movement.product;
        this.movement.stock = this.data._movement.stock;
    }
    OpenSnackBar(message, action) {
        this._snackBar.open(message, action, {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000,
            panelClass: ['blue-snackbar'],
        });
    }
    ClientSelected($event) {
        this.movement.client = ($event.name + " " + $event.dni);
        this.movement.guide = $event.guide;
    }
    onNoClick() {
        this.dialogRef.close();
    }
};
CreatemovementComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-createmovement',
        templateUrl: './createmovement.component.html',
        styleUrls: ['./createmovement.component.css'],
        providers: [movements_service_1.MovementsService, products_service_1.ProductsService, clients_service_1.ClientsService]
    }),
    __param(7, (0, core_1.Inject)(dialog_1.MAT_DIALOG_DATA))
], CreatemovementComponent);
exports.CreatemovementComponent = CreatemovementComponent;
