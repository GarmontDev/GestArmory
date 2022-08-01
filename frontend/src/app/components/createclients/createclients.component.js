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
exports.CreateclientsComponent = void 0;
const core_1 = require("@angular/core");
const client_1 = require("../../models/client");
const clients_service_1 = require("../../services/clients.service");
const dialog_1 = require("@angular/material/dialog");
let CreateclientsComponent = class CreateclientsComponent {
    constructor(_clientsService, _snackBar, dateAdapter, dialogRef, dialog, data) {
        this._clientsService = _clientsService;
        this._snackBar = _snackBar;
        this.dateAdapter = dateAdapter;
        this.dialogRef = dialogRef;
        this.dialog = dialog;
        this.data = data;
        this.visible = false;
        this.errorInfo = '';
        this._date = new Date();
        this.editMode = false;
        this.horizontalPosition = 'center';
        this.verticalPosition = 'top';
        this.client = new client_1.Client('', '', '', '', '', '', '', this._date);
        this.status = "";
        this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    }
    ngOnInit() {
    }
    ngAfterContentInit() {
        if (this.data.editMode) {
            this.editMode = true;
            this.LoadClientData();
        }
        else {
            this.editMode = false;
            //this.NewClient();
        }
    }
    CheckDNI(dni) {
        this._clientsService.getClients().subscribe((result) => {
            for (let index = 0; index < result.clients.length; index++) {
                const element = result.clients[index];
                if (element.dni == dni) {
                    this.errorInfo = "* Already exist";
                    return;
                }
                else {
                    this.errorInfo = "";
                }
            }
        });
    }
    NewClient() {
        this._clientsService.addNewClient(this.client).subscribe((result) => {
            if (result) {
                this.openSnackBar("Client added succesfully.", "OK");
                this.dialogRef.close();
            }
            else {
                this.openSnackBar("An error ocurred.", "OK");
            }
        });
    }
    UpdateClient() {
        this._clientsService.updateClient(this.client).subscribe((response) => {
            if (response) {
                this.openSnackBar("Client updated succesfully.", "OK");
            }
            else {
                this.openSnackBar("There was a problem updating the client.", "OK");
            }
        });
        this.editMode = false;
        this.dialogRef.close();
    }
    LoadClientData() {
        this.client._id = this.data._client._id;
        this.client.dni = this.data._client.dni;
        this.client.name = this.data._client.name;
        this.client.address = this.data._client.address;
        this.client.city = this.data._client.city;
        this.client.province = this.data._client.province;
        this.client.guide = this.data._client.guide;
        this.client.guideexpeditiondate = this.data._client.guideexpeditiondate;
    }
    showNewClientForm() {
        this.visible = true;
    }
    hideNewClientForm() {
        this.visible = false;
    }
    openSnackBar(message, action) {
        this._snackBar.open(message, action, {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000,
            panelClass: ['blue-snackbar'],
        });
    }
    onNoClick() {
        this.dialogRef.close();
    }
};
CreateclientsComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-createclients',
        templateUrl: './createclients.component.html',
        styleUrls: ['./createclients.component.css'],
        providers: [clients_service_1.ClientsService]
    }),
    __param(5, (0, core_1.Inject)(dialog_1.MAT_DIALOG_DATA))
], CreateclientsComponent);
exports.CreateclientsComponent = CreateclientsComponent;
