import { Component, OnInit, Inject } from '@angular/core';
import { Form } from '@angular/forms';

import { Client } from '../../models/client';
import { ClientsService } from '../../services/clients.service';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';

export interface DialogData {
  _client: Client;
  editMode: boolean;
}

@Component({
  selector: 'app-createclients',
  templateUrl: './createclients.component.html',
  styleUrls: ['./createclients.component.css'],
  providers: [ClientsService]
})
export class CreateclientsComponent implements OnInit {

  public client: Client;
  public status: String;
  public visible: boolean = false;
  public errorInfo: String = '';
  private _date = new Date();

  public editMode: boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _clientsService: ClientsService,
    private _snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>,

    public dialogRef: MatDialogRef<CreateclientsComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.client = new Client ('','','','','','','',this._date);
    this.status = "";
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {
  }

  ngAfterContentInit (){
    if (this.data.editMode){
      this.editMode = true;
      this.LoadClientData();
    }else{
      this.editMode = false;
      //this.NewClient();
    }
  }

  CheckDNI(dni:any){
    this._clientsService.getClients().subscribe((result)=>{
      for (let index = 0; index < result.clients.length; index++) {
        const element = result.clients[index];
        if (element.dni == dni){
          this.errorInfo = "* Already exist";
          return;
        }else{
          this.errorInfo = "";
        }
      }
    });
  }

  NewClient(){
    this._clientsService.addNewClient(this.client).subscribe((result) =>{
      if(result){
        this.openSnackBar("Client added succesfully.", "OK");
        this.dialogRef.close();
      }else{
        this.openSnackBar("An error ocurred.", "OK");
      }
    });
  }

  UpdateClient(){
    this._clientsService.updateClient(this.client).subscribe((
      response) =>{
        if(response){
          this.openSnackBar("Client updated succesfully.", "OK");
        }else{
          this.openSnackBar("There was a problem updating the client.", "OK");
        }
      }
    );
    this.editMode = false;
    this.dialogRef.close();
  }

  LoadClientData(){
    this.client._id = this.data._client._id;
    this.client.dni = this.data._client.dni;
    this.client.name = this.data._client.name;
    this.client.address = this.data._client.address;
    this.client.city = this.data._client.city;
    this.client.province = this.data._client.province;
    this.client.guide = this.data._client.guide;
    this.client.guideexpeditiondate = this.data._client.guideexpeditiondate;
  }


  showNewClientForm():void{
    this.visible = true;
  }

  hideNewClientForm():void{
    this.visible = false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
      panelClass: ['blue-snackbar'],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
