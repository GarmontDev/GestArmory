import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Movement } from '../../models/movement';
import { Client } from '../../models/client';
import { MovementsService } from '../../services/movements.service';
import { ProductsService } from '../../services/products.service';
import { CreatemovementComponent } from '../createmovement/createmovement.component';
import { PdfreportComponent } from '../pdfreport/pdfreport.component';
import { Router } from "@angular/router";

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Product } from '../../models/products.model';
import {FormControl} from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { OAuthService } from 'angular-oauth2-oidc';


@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css'],
  providers: [MovementsService, ProductsService]
})

export class MovementsComponent implements OnInit, AfterViewInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterTerm!: string;
  public movements: Movement[] = [];
  public movement!: Movement;
  public product: Product;
  public client!: Client;
  public editIndex: string = "";
  public products: Product[] = [];
  public editMode: boolean = false;
  private movesCounter: number = 0;
  private _date = new Date();
  tooltip = new FormControl(true);

  displayedColumns: string[] = ['seatNumber', 'date', 'product', 'guide', 'client', 'stock','report', 'edit', 'remove'];

  dataSource = new MatTableDataSource<Movement>(this.movements);

  constructor(
    private oauthService:OAuthService,
    private _movementService: MovementsService,
    private _productsService: ProductsService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
  ) {
    this.movement = new Movement('',0,this._date,'','','',0);
    this.product = new Product('','',0);
  }

  ngOnInit(): void {
    this.getMovements();
    this._productsService.getProducts().subscribe((result=>{
      this.products = result.products;
    }));

    var tooltipState = localStorage.getItem('movementsColourTooltip');

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

  ApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  NewMovementDialog(): void {
    this.openSnackBar("Select a client with double click.", "OK");
    this.router.navigate(['/clients']);
  }

  GenerateReport(selectedRow: any){
    const dialogRef = this.dialog.open(PdfreportComponent, {
      width: '400px',
      data: {_movement: selectedRow},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.movement = result;
      this.editMode = false;
      this.getMovements();
    });
  }

  EditRowClick(selectedRow: any){
    this.editMode = true;
    const dialogRef = this.dialog.open(CreatemovementComponent, {
      width: '400px',
      data: {_movement: selectedRow, editMode: this.editMode},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.movement = result;
      this.editMode = false;
      this.getMovements();
    });
  }

  TooltipClicked(){
    if (this.tooltip.value == true){
      localStorage.setItem('movementsColourTooltip', 'false');
    }else{
      localStorage.setItem('movementsColourTooltip', 'true');
    }
  }

  getMovements(){
    this._movementService.getMovements().subscribe((
      response) =>{
      if(response.movements){
        this.movements = response.movements;
        this.dataSource.data = response.movements;
      }else{
        console.log("Cant load the movements");
      }
      (error: any) => {
        console.log(<any>error);
      }
    });
  }

  DeleteMovement(id: any){
    //TODO Replace confirm alert with a dialog material
    if(confirm("Are you sure you want to delete this client?")){
      this._movementService.deleteMovement(id).subscribe((
        response) =>{
          if(response.movement){
            this.getMovements();
            this.openSnackBar("Movement removed succesfully.", "OK");
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

  openDeleteSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
      panelClass: ['blue-snackbar'],
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
      panelClass: ['blue-snackbar'],
    });
  }

  GetSeatNumber(){
    this._movementService.getMovements().subscribe((result=>{
      if(result){
        for (let index = 0; index < result.movements.length; index++) {
          const value = result.movements[index].seatNumber;
          console.log(value);
          if (value > this.movesCounter){
            this.movesCounter = value;
          }
        }
      }
      console.log("New seat:  "+this.movesCounter);
    }));
  }

  LoadMovementsFromFakeAPI(){
    this.movement = new Movement('',0,this._date,'','','',0);

    this._movementService.FetchMovements().subscribe((response)=>{
      if(response){
        //this.GetSeatNumber();

        for (let index = 0; index < response.users.length; index++) {
          const user = response.users[index];
          const randomProduct = this.products[Math.floor(Math.random() * this.products.length)].name;

          const stock = [-50,50,75,85,80,-100,-125,150,-200];
          const randomStock = Math.floor(Math.random() * stock.length);

          this.movesCounter = this.movesCounter +1;
          this.movement.seatNumber = this.movesCounter;

          this.movement.date = this._date;
          this.movement.guide = user.bank.iban;
          this.movement.product = randomProduct;
          this.movement.client = user.firstName + " " + user.maidenName +" "+ user.lastName + " " +user.bank.cardNumber
          this.movement.stock = stock[randomStock];

          // if (income[randomIncome] == 0){
          //   this.movement.income = 0;
          //   this.movement.outcome = outcome[randomOutcome];
          // }else{
          //   this.movement.outcome = 0;
          //   this.movement.income = income[randomIncome];
          // }

          if(this.movement.stock == null){
            this.movement.stock = 1000;
          }

          this._movementService.addNewmovement(this.movement).subscribe(() =>{
            this.getMovements();
            this.openSnackBar('Movements loaded','OK');
          });
        }
      }else{
        console.log("CAN'T LOAD THE USERS FROM THE FAKE API");
      }
    });
  }

  DeleteALLMovements(){
    if(confirm("Are you sure you want to delete ALL the clients?")){
      this._movementService.getMovements().subscribe((response)=>{
        if(response){
          for (let index = 0; index < response.movements.length; index++) {
            const movement = response.movements[index];
            this._movementService.deleteMovement(movement._id).subscribe(()=>{
              this.getMovements();
              this.openSnackBar('All the movements have been deleted.','OK');
            });

          }
        }
      })
    }
  }
}
