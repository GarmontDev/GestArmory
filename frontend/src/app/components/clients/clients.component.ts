import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output} from '@angular/core';
import { Client } from '../../models/client';
import { ClientsService } from '../../services/clients.service';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CreatemovementComponent } from '../createmovement/createmovement.component';
import { CreateclientsComponent } from '../createclients/createclients.component';
import {FormControl} from '@angular/forms';
import { OAuthService } from 'angular-oauth2-oidc';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  providers: [ ClientsService ]
})

export class ClientsComponent implements OnInit {

  filterTerm!: string;
  public clients: Client[] = [];
  public client: Client;
  public editMode: boolean = false;
  public info: string = "";
  public fakeClientsLoaded: boolean = false;
  private _date = new Date();
  public tooltip = new FormControl(true);

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['dni', 'name', 'address', 'city', 'province', 'guide', 'guideexpeditiondate', 'edit', 'remove'];

  dataSource = new MatTableDataSource<Client>(this.clients);

  constructor(
    private oauthService:OAuthService,
    private _clientsService: ClientsService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.clients = [];
    this.client = new Client ('','','','','','','',this._date);
  }

  ngOnInit(): void {
    this.getClients();

    var tooltipState = localStorage.getItem('clientsTooltip');

    if(tooltipState == 'false'){
      this.tooltip.setValue(false);
    }else{
      this.tooltip.setValue(true);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get token(){
    const claims:any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }

  tooltipClicked(){
    if (this.tooltip.value == true){
      localStorage.setItem('clientsTooltip', 'false');
    }else{
      localStorage.setItem('clientsTooltip', 'true');
    }
  }

  ApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getClients(){
    this._clientsService.getClients().subscribe((
      response) =>{
      if(response.clients){
        this.clients = response.clients;
        this.dataSource.data = response.clients;
      }else{
        console.log("Cant load the clients");
      }
      (error: any) => {
        console.log(<any>error);
      }
    });
  }

  NewClient(){
    this._clientsService.getClients().subscribe((response) =>{
      if(response.clients){
        this.CreateClientDialog();
      }else{
        console.log("Cant load the clients");
      }
      (error: any) => {
        console.log(<any>error);
      }
    });
  }

  CreateClientDialog(){
    const dialogRef = this.dialog.open(CreateclientsComponent, {
      width: '600px',
      height: '550px',
      data: {_movement: '',_client: this.client, editMode: this.editMode},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.editMode = false;
      this.getClients();
    });
  }

  NewMovement(selectedRow: Client){
    this.editMode = false;
    const dialogRef = this.dialog.open(CreatemovementComponent, {
      width: '600px',
      data: {_movement: '',_client: selectedRow, editMode: this.editMode},
    });
  }

  EditClientRow(selectedRow: any){
    this.editMode = true;
    const dialogRef = this.dialog.open(CreateclientsComponent, {
      width: '600px',
      data: {_client: selectedRow, editMode: this.editMode},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.client = result;
      this.editMode = false;
      this.getClients();
    });
  }

  UpdateClient(client:Client){
    this._clientsService.updateClient(client).subscribe((
      response) =>{
        console.log("client: "+client.name);
        if(response.client){
          this.getClients();
          this.openSnackBar("Client updated succesfully.", "OK");
        }else{
          this.openSnackBar("Error, cannot update the client, contact your support team.", "OK");
        }
      }
    );
  }

  DeleteClient(id: any){
    //TODO Replace confirm alert with a dialog material
    if(confirm("Are you sure you want to delete this client?")){
      this._clientsService.deleteClient(id).subscribe((
        response) =>{
          if(response.client){
            this.getClients();
            this.openSnackBar("Client removed succesfully.", "OK");
          }
        }
      );
    };
  }

  public ExportToPDF():void {
    let PDF = new jsPDF();
    var img = new Image()

    img.src = 'assets/img/logo.png'
    PDF.addImage(img, 'png', 14, 2, 30, 11)
    PDF.setFontSize(15);
    autoTable(PDF, { html: '#htmlData'})
    PDF.text('Movements List',80,9);

    PDF.output('dataurlnewwindow');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
      panelClass: ['blue-snackbar'],
    });
  }

  LoadClientsFromFakeAPI(){
    this.fakeClientsLoaded = true;
    this.client = new Client ('','','','','','','',this._date);

    this._clientsService.FetchClients().subscribe((response)=>{
      if(response){
        for (let index = 0; index < response.users.length; index++) {
          const user = response.users[index];

          this.client.name = user.firstName + " " + user.maidenName +" "+ user.lastName;
          this.client.address = user.address.address;
          this.client.city = user.address.city;
          this.client.dni = user.bank.cardNumber;
          this.client.guide = user.bank.iban;
          this.client.guideexpeditiondate = user.birthDate;
          this.client.province = user.address.city;

          this._clientsService.addNewClient(this.client).subscribe(() =>{
            this.getClients();
            //this.fakeClientsLoaded = true;
            this.openSnackBar('Clients loaded','OK');
          });
        }
      }else{
        //this.fakeClientsLoaded = false;
        console.log("CAN'T LOAD THE USERS FROM THE FAKE API");
      }
    });
    this.fakeClientsLoaded = true;
  }

  DeleteALLClients(){
    if(confirm("Are you sure you want to delete ALL the clients?")){
      this._clientsService.getClients().subscribe((response)=>{
        if(response){
          for (let index = 0; index < response.clients.length; index++) {
            const user = response.clients[index];
            this._clientsService.deleteClient(user._id).subscribe((deleted)=>{
              this.getClients();
              this.openSnackBar('All the clients have been deleted.','OK');
            });
          }
        }
      })
    }
  }
}
