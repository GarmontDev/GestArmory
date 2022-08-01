import { Component, OnInit, Inject, AfterViewInit, AfterContentInit } from '@angular/core';

import { Client } from '../../models/client';
import { Movement } from '../../models/movement';

import { MovementsService } from '../../services/movements.service';
import { ClientsService } from '../../services/clients.service';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';

export interface DialogData {
  _movement: Movement;
  _client: Client;
  editMode: boolean;
}


@Component({
  selector: 'app-createmovement',
  templateUrl: './createmovement.component.html',
  styleUrls: ['./createmovement.component.css'],
  providers: [MovementsService, ProductsService, ClientsService]
})
export class CreatemovementComponent implements OnInit, AfterContentInit {

  public movement: Movement;
  public product: Product;
  public client: Client;
  public clients: Client[] = [];
  public products: Product[] = [];
  public errorInfo: String = '';
  private _date = new Date();
  public radioPosition: 'income' | 'outcome' = 'outcome';

  public editMode: boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _movementsService: MovementsService,
    private _productsService: ProductsService,
    private _clientsService: ClientsService,
    private _snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>,

    public dialogRef: MatDialogRef<CreatemovementComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,

  ) {
    this.movement = new Movement ('',0,this._date,'','','',0);
    this.product = new Product('','',0);
    this.client = new Client('','','','','','','',this._date);
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {
    this.GetProducts();
    this.LoadClients();
  }

  ngAfterContentInit (){
    if (this.data.editMode){
      this.editMode = true;
      this.LoadMovementData();
    }else{
      this.editMode = false;
      this.NewMovement();
    }
  }

  NewMovement(){
    this._movementsService.getMovements().subscribe((
      response) =>{
      if(response.movements){
        //var newSeat = (Object.keys(response.movements).length+1);
        //this.movement.seatNumber = newSeat
        this.GetNewSeatNumber();
        this.movement.date = this._date;
        this.movement.client = this.data._client.name +" "+this.data._client.dni;
        this.movement.guide = this.data._client.guide;
      }else{
        console.log("Cant load the movements");
      }
      (error: any) => {
        console.log(<any>error);
      }
    });
  }

  LoadClients(){
    this._clientsService.getClients().subscribe((result)=>{
      if (result){
        this.clients = result.clients;
      }else{
        this.OpenSnackBar("There are no clients available, please create one", "OK");
      }
    });
  }


  GetProducts(){
    this._productsService.getProducts().subscribe((result)=>{
      if (result){
        this.products = result.products;
      }else{
        this.OpenSnackBar("There are no products available, please create one", "OK");
      }
    });
  }

  CheckSeatNumber(seat:any){
    this._movementsService.getMovements().subscribe((result)=>{
      for (let index = 0; index < result.movements.length; index++) {
        const element = result.movements[index];
        if (element.seatNumber == seat){
          this.errorInfo = "* Already exist";
          return;
        }else{
          this.errorInfo = "";
        }
      }
    });
  }

  GetNewSeatNumber(){
    var highest:number = 0;

    this._movementsService.getMovements().subscribe((result)=>{
      for (let index = 0; index < result.movements.length; index++) {
        var seat = result.movements[index].seatNumber;
        if(Number(seat) > highest){
          highest = seat;
        }
      }
      highest = Number(highest)+1;
      this.movement.seatNumber = highest;
    });
  }

  CreateMovement(){
    this._movementsService.addNewmovement(this.movement).subscribe((result) =>{
      if(result){
        this.UpdateStock();
      }else{
        this.OpenSnackBar("An error ocurred, please contact your support team", "OK");
      }
    });

    this.editMode = false;
    this.dialogRef.close();
  }

  UpdateStock(){
    this._productsService.getProducts().subscribe((result)=>{
      for (let index = 0; index < result.products.length; index++) {
        const element = result.products[index];
        if(element.name == this.movement.product){
          this.product._id = element._id;
          this.product.name = element.name;
          this.product.stock = (element.stock+this.movement.stock);

          this._productsService.updateProduct(this.product).subscribe(response=>{
            this.OpenSnackBar("Movement added succesfully.", "OK");
          });
        }
      }
    });
  }

  UpdateMovement(){
    this._movementsService.updateMovement(this.movement).subscribe((
      response) =>{
        if(response){
          this.OpenSnackBar("Movement updated succesfully.", "OK");
        }else{
          this.OpenSnackBar("There was a problem updating the movement.", "OK");
        }
      }
    );
    this.editMode = false;
    this.dialogRef.close();
  }

  LoadMovementData(){
    this.movement._id = this.data._movement._id;
    this.movement.seatNumber = this.data._movement.seatNumber;
    this.movement.date = this.data._movement.date;
    this.movement.client = this.data._movement.client;
    this.movement.guide = this.data._movement.guide;
    this.movement.product = this.data._movement.product;
    this.movement.stock = this.data._movement.stock;
  }

  OpenSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
      panelClass: ['blue-snackbar'],
    });
  }

  public ClientSelected($event:any){
    this.movement.client = ($event.name + " "+ $event.dni);
    this.movement.guide = $event.guide;
  }

  onNoClick(): void {
      this.dialogRef.close();
  }
}




