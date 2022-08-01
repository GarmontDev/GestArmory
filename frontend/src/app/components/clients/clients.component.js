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
exports.ClientsComponent = void 0;
const core_1 = require("@angular/core");
const client_1 = require("../../models/client");
const clients_service_1 = require("../../services/clients.service");
const jspdf_1 = __importDefault(require("jspdf"));
require("jspdf-autotable");
const jspdf_autotable_1 = __importDefault(require("jspdf-autotable"));
const table_1 = require("@angular/material/table");
const paginator_1 = require("@angular/material/paginator");
const sort_1 = require("@angular/material/sort");
const createmovement_component_1 = require("../createmovement/createmovement.component");
const createclients_component_1 = require("../createclients/createclients.component");
const forms_1 = require("@angular/forms");
let ClientsComponent = class ClientsComponent {
    constructor(oauthService, _clientsService, _snackBar, dialog) {
        this.oauthService = oauthService;
        this._clientsService = _clientsService;
        this._snackBar = _snackBar;
        this.dialog = dialog;
        this.clients = [];
        this.editMode = false;
        this.info = "";
        this.fakeClientsLoaded = false;
        this._date = new Date();
        this.tooltip = new forms_1.FormControl(true);
        this.horizontalPosition = 'center';
        this.verticalPosition = 'top';
        this.displayedColumns = ['dni', 'name', 'address', 'city', 'province', 'guide', 'guideexpeditiondate', 'edit', 'remove'];
        this.dataSource = new table_1.MatTableDataSource(this.clients);
        this.clients = [];
        this.client = new client_1.Client('', '', '', '', '', '', '', this._date);
    }
    ngOnInit() {
        this.getClients();
        var tooltipState = localStorage.getItem('clientsTooltip');
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
    tooltipClicked() {
        if (this.tooltip.value == true) {
            localStorage.setItem('clientsTooltip', 'false');
        }
        else {
            localStorage.setItem('clientsTooltip', 'true');
        }
    }
    ApplyFilter(event) {
        const filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    getClients() {
        this._clientsService.getClients().subscribe((response) => {
            if (response.clients) {
                this.clients = response.clients;
                this.dataSource.data = response.clients;
            }
            else {
                console.log("Cant load the clients");
            }
            (error) => {
                console.log(error);
            };
        });
    }
    NewClient() {
        this._clientsService.getClients().subscribe((response) => {
            if (response.clients) {
                this.CreateClientDialog();
            }
            else {
                console.log("Cant load the clients");
            }
            (error) => {
                console.log(error);
            };
        });
    }
    CreateClientDialog() {
        const dialogRef = this.dialog.open(createclients_component_1.CreateclientsComponent, {
            width: '600px',
            height: '550px',
            data: { _movement: '', _client: this.client, editMode: this.editMode },
        });
        dialogRef.afterClosed().subscribe(result => {
            this.editMode = false;
            this.getClients();
        });
    }
    NewMovement(selectedRow) {
        this.editMode = false;
        const dialogRef = this.dialog.open(createmovement_component_1.CreatemovementComponent, {
            width: '600px',
            data: { _movement: '', _client: selectedRow, editMode: this.editMode },
        });
    }
    EditClientRow(selectedRow) {
        this.editMode = true;
        const dialogRef = this.dialog.open(createclients_component_1.CreateclientsComponent, {
            width: '600px',
            data: { _client: selectedRow, editMode: this.editMode },
        });
        dialogRef.afterClosed().subscribe(result => {
            this.client = result;
            this.editMode = false;
            this.getClients();
        });
    }
    UpdateClient(client) {
        this._clientsService.updateClient(client).subscribe((response) => {
            console.log("client: " + client.name);
            if (response.client) {
                this.getClients();
                this.openSnackBar("Client updated succesfully.", "OK");
            }
            else {
                this.openSnackBar("Error, cannot update the client, contact your support team.", "OK");
            }
        });
    }
    DeleteClient(id) {
        //TODO Replace confirm alert with a dialog material
        if (confirm("Are you sure you want to delete this client?")) {
            this._clientsService.deleteClient(id).subscribe((response) => {
                if (response.client) {
                    this.getClients();
                    this.openSnackBar("Client removed succesfully.", "OK");
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
    openSnackBar(message, action) {
        this._snackBar.open(message, action, {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000,
            panelClass: ['blue-snackbar'],
        });
    }
    LoadClientsFromFakeAPI() {
        this.fakeClientsLoaded = true;
        this.client = new client_1.Client('', '', '', '', '', '', '', this._date);
        this._clientsService.FetchClients().subscribe((response) => {
            if (response) {
                for (let index = 0; index < response.users.length; index++) {
                    const user = response.users[index];
                    this.client.name = user.firstName + " " + user.maidenName + " " + user.lastName;
                    this.client.address = user.address.address;
                    this.client.city = user.address.city;
                    this.client.dni = user.bank.cardNumber;
                    this.client.guide = user.bank.iban;
                    this.client.guideexpeditiondate = user.birthDate;
                    this.client.province = user.address.city;
                    this._clientsService.addNewClient(this.client).subscribe(() => {
                        this.getClients();
                        //this.fakeClientsLoaded = true;
                        this.openSnackBar('Clients loaded', 'OK');
                    });
                }
            }
            else {
                //this.fakeClientsLoaded = false;
                console.log("CAN'T LOAD THE USERS FROM THE FAKE API");
            }
        });
        this.fakeClientsLoaded = true;
    }
    DeleteALLClients() {
        if (confirm("Are you sure you want to delete ALL the clients?")) {
            this._clientsService.getClients().subscribe((response) => {
                if (response) {
                    for (let index = 0; index < response.clients.length; index++) {
                        const user = response.clients[index];
                        this._clientsService.deleteClient(user._id).subscribe((deleted) => {
                            this.getClients();
                            this.openSnackBar('All the clients have been deleted.', 'OK');
                        });
                    }
                }
            });
        }
    }
};
__decorate([
    (0, core_1.ViewChild)('htmlData')
], ClientsComponent.prototype, "htmlData", void 0);
__decorate([
    (0, core_1.ViewChild)(paginator_1.MatPaginator)
], ClientsComponent.prototype, "paginator", void 0);
__decorate([
    (0, core_1.ViewChild)(sort_1.MatSort)
], ClientsComponent.prototype, "sort", void 0);
ClientsComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-clients',
        templateUrl: './clients.component.html',
        styleUrls: ['./clients.component.css'],
        providers: [clients_service_1.ClientsService]
    })
], ClientsComponent);
exports.ClientsComponent = ClientsComponent;
