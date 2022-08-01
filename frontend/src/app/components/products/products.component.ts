import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Product } from '../../models/products.model';
import { Movement } from '../../models/movement';
import { ProductsService } from '../../services/products.service';
import { MovementsService } from '../../services/movements.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService, MovementsService]
})
export class ProductsComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filterTerm!: string;
  public products: Product[] = [];
  public product: Product;
  public movement: Movement;
  public editMode: boolean = false;
  public affectToMovements: boolean = false;
  public editIndex: string = '';
  public previousName: string = '';
  public newName: string = '';
  public errorInfo: String = '';
  private _date = new Date();

  //Products -> ['Calibre22','Fogueo','Metalica', 'No Metalica', 'Pistones','Polvora'];

  //displayedColumns: string[] = ['id', 'name', 'edit', 'remove'];
  displayedColumns: string[] = ['id', 'name', 'stock','edit', 'remove'];

  dataSource = new MatTableDataSource<Product>(this.products);

  constructor(
    private oauthService:OAuthService,
    private _productsService: ProductsService,
    private _movementsService: MovementsService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    this.product = new Product('','',0);
    this.movement = new Movement('',0,this._date,'','','',0);
  }

  ngOnInit(): void {
    this.GetProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  get token(){
    const claims:any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }

  EditProduct(selectedProduct: any){
    this.editMode = true;
    this.previousName = selectedProduct.name;
    this.product._id = selectedProduct._id;
    this.product.name = selectedProduct.name;
  }

  CancelEditProduct(){
    this.editMode = false;
    this.product.name = "";
  }


  NewProduct(){
    if (this.product.name == ''){
      this.openSnackBar("Product name can't be empty.", "OK");
    }else{
      this._productsService.addProduct(this.product).subscribe((result) =>{
        if(result){
          this.openSnackBar("Product added succesfully.", "OK");
          this.GetProducts();
          this.ClearInput();
        }else{
          this.openSnackBar("An error ocurred, please contact your support team", "OK");
        }
      });
    }
  }

  ClearInput(){
    this.product.name = '';
  }

  GetProducts(){
    this._productsService.getProducts().subscribe((response) =>{
      if(response.products){
        this.products = response.products;
        this.dataSource.data = response.products;
      }else{
        console.log("Cant load the products");
      }
      (error: any) => {
        console.log(<any>error);
      }
    });
  }

  DeleteProduct(id: any){
    //TODO Replace confirm alert with a dialog material
    if(confirm("Are you sure you want to delete this product?")){
      this._productsService.deleteProduct(id).subscribe((
        response) =>{
          if(response.product){
            this.GetProducts();
            this.openSnackBar("Product removed succesfully.", "OK");
          }
        }
      );
    };
  }

  UpdateProduct(){
    this.newName = this.product.name;
    this._productsService.updateProduct(this.product).subscribe((
      response) =>{
        if(response){
          if (this.affectToMovements == true){
            this.UpdateProductNameInMovements();
          }
          this.CancelEditProduct();
          this.GetProducts();
          this.ClearInput();
          this.openSnackBar("Product updated succesfully.", "OK");
        }else{
          this.openSnackBar("There was a problem updating the product.", "OK");
        }
      }
    );
  }

  UpdateProductNameInMovements(){
    this._movementsService.getMovements().subscribe((result)=>{
      if(result.movements){
        for (let index = 0; index < result.movements.length; index++) {
          const element = result.movements[index];
          if(element.product == this.previousName){
            this.movement = element;
            this.movement.product = this.newName;
            this._movementsService.updateMovement(this.movement).subscribe((updateResult)=>{
              if(updateResult){
                console.log("Changed all the movements");
              }
            });
          }
        }
      }
    });
  }

  ValidateProduct(product: Product){
    this._productsService.getProducts().subscribe((response) =>{
      if(response.products){
        for (let index = 0; index < response.products.length; index++) {
          const element = response.products[index];
          if (element.name == product){
            this.errorInfo = "Already exist. *";
            return;
          }else{
            this.errorInfo = "";
          }
        }
      }else{
        console.log("Cant load the products");
      }
      (error: any) => {
        console.log(<any>error);
      }
    });
  }

  RefreshStock(){
    this._productsService.getProducts().subscribe((result) =>{
      if (result.products){
        for (let index = 0; index < result.products.length; index++) {
          const element = result.products[index];
          let amount = 0;
          this._movementsService.getMovements().subscribe((response)=>{
            for (let index = 0; index < response.movements.length; index++) {
              const element2 = response.movements[index];
              if (element2.product == element.name){
                amount = (amount + element2.stock);

                this.product._id = element._id;
                this.product.name = element.name;
                this.product.stock = amount;

                this._productsService.updateProduct(this.product).subscribe((updateResult)=>{
                  if (!updateResult){
                    this.openSnackBar('An error ocurred, try again or contact support.','OK');
                  }
                });
                this.product.name = ''; //Keep the input field empty after updating the product
              }
            }
            //console.log("Total "+element.name+": "+amount);
          });
        }
        this.GetProducts();
        this.openSnackBar('Stock updated.','OK');
      }
    });

  }

  LoadDefaultProducts(){
    const defaultProducts = ['Calibre22','Fogueo','Metalica', 'No Metalica', 'Pistones','Polvora'];

    for (let index = 0; index < defaultProducts.length; index++) {
      const defaultProduct = defaultProducts[index];
      this.product = new Product('',defaultProduct,0);
      this._productsService.addProduct(this.product).subscribe(() =>{
        this.GetProducts();
        this.product.name = '';
        this.openSnackBar('Products loaded','OK');
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
      panelClass: ['blue-snackbar'],
    });
  }

}
