"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsComponent = void 0;
const core_1 = require("@angular/core");
const products_model_1 = require("../../models/products.model");
const movement_1 = require("../../models/movement");
const products_service_1 = require("../../services/products.service");
const movements_service_1 = require("../../services/movements.service");
const paginator_1 = require("@angular/material/paginator");
const table_1 = require("@angular/material/table");
let ProductsComponent = class ProductsComponent {
    constructor(oauthService, _productsService, _movementsService, _snackBar, dialog) {
        this.oauthService = oauthService;
        this._productsService = _productsService;
        this._movementsService = _movementsService;
        this._snackBar = _snackBar;
        this.dialog = dialog;
        this.horizontalPosition = 'center';
        this.verticalPosition = 'top';
        this.products = [];
        this.editMode = false;
        this.affectToMovements = false;
        this.editIndex = '';
        this.previousName = '';
        this.newName = '';
        this.errorInfo = '';
        this._date = new Date();
        //Products -> ['Calibre22','Fogueo','Metalica', 'No Metalica', 'Pistones','Polvora'];
        //displayedColumns: string[] = ['id', 'name', 'edit', 'remove'];
        this.displayedColumns = ['id', 'name', 'stock', 'edit', 'remove'];
        this.dataSource = new table_1.MatTableDataSource(this.products);
        this.product = new products_model_1.Product('', '', 0);
        this.movement = new movement_1.Movement('', 0, this._date, '', '', '', 0);
    }
    ngOnInit() {
        this.GetProducts();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    get token() {
        const claims = this.oauthService.getIdentityClaims();
        return claims ? claims : null;
    }
    EditProduct(selectedProduct) {
        this.editMode = true;
        this.previousName = selectedProduct.name;
        this.product._id = selectedProduct._id;
        this.product.name = selectedProduct.name;
    }
    CancelEditProduct() {
        this.editMode = false;
        this.product.name = "";
    }
    NewProduct() {
        if (this.product.name == '') {
            this.openSnackBar("Product name can't be empty.", "OK");
        }
        else {
            this._productsService.addProduct(this.product).subscribe((result) => {
                if (result) {
                    this.openSnackBar("Product added succesfully.", "OK");
                    this.GetProducts();
                    this.ClearInput();
                }
                else {
                    this.openSnackBar("An error ocurred, please contact your support team", "OK");
                }
            });
        }
    }
    ClearInput() {
        this.product.name = '';
    }
    GetProducts() {
        this._productsService.getProducts().subscribe((response) => {
            if (response.products) {
                this.products = response.products;
                this.dataSource.data = response.products;
            }
            else {
                console.log("Cant load the products");
            }
            (error) => {
                console.log(error);
            };
        });
    }
    DeleteProduct(id) {
        //TODO Replace confirm alert with a dialog material
        if (confirm("Are you sure you want to delete this product?")) {
            this._productsService.deleteProduct(id).subscribe((response) => {
                if (response.product) {
                    this.GetProducts();
                    this.openSnackBar("Product removed succesfully.", "OK");
                }
            });
        }
        ;
    }
    UpdateProduct() {
        this.newName = this.product.name;
        this._productsService.updateProduct(this.product).subscribe((response) => {
            if (response) {
                if (this.affectToMovements == true) {
                    this.UpdateProductNameInMovements();
                }
                this.CancelEditProduct();
                this.GetProducts();
                this.ClearInput();
                this.openSnackBar("Product updated succesfully.", "OK");
            }
            else {
                this.openSnackBar("There was a problem updating the product.", "OK");
            }
        });
    }
    UpdateProductNameInMovements() {
        this._movementsService.getMovements().subscribe((result) => {
            if (result.movements) {
                for (let index = 0; index < result.movements.length; index++) {
                    const element = result.movements[index];
                    if (element.product == this.previousName) {
                        this.movement = element;
                        this.movement.product = this.newName;
                        this._movementsService.updateMovement(this.movement).subscribe((updateResult) => {
                            if (updateResult) {
                                console.log("Changed all the movements");
                            }
                        });
                    }
                }
            }
        });
    }
    ValidateProduct(product) {
        this._productsService.getProducts().subscribe((response) => {
            if (response.products) {
                for (let index = 0; index < response.products.length; index++) {
                    const element = response.products[index];
                    if (element.name == product) {
                        this.errorInfo = "Already exist. *";
                        return;
                    }
                    else {
                        this.errorInfo = "";
                    }
                }
            }
            else {
                console.log("Cant load the products");
            }
            (error) => {
                console.log(error);
            };
        });
    }
    RefreshStock() {
        this._productsService.getProducts().subscribe((result) => {
            if (result.products) {
                for (let index = 0; index < result.products.length; index++) {
                    const element = result.products[index];
                    let amount = 0;
                    this._movementsService.getMovements().subscribe((response) => {
                        for (let index = 0; index < response.movements.length; index++) {
                            const element2 = response.movements[index];
                            if (element2.product == element.name) {
                                amount = (amount + element2.stock);
                                this.product._id = element._id;
                                this.product.name = element.name;
                                this.product.stock = amount;
                                this._productsService.updateProduct(this.product).subscribe((updateResult) => {
                                    if (!updateResult) {
                                        this.openSnackBar('An error ocurred, try again or contact support.', 'OK');
                                    }
                                });
                                this.product.name = ''; //Keep the input field empty after updating the product
                            }
                        }
                        //console.log("Total "+element.name+": "+amount);
                    });
                }
                this.GetProducts();
                this.openSnackBar('Stock updated.', 'OK');
            }
        });
    }
    LoadDefaultProducts() {
        const defaultProducts = ['Calibre22', 'Fogueo', 'Metalica', 'No Metalica', 'Pistones', 'Polvora'];
        for (let index = 0; index < defaultProducts.length; index++) {
            const defaultProduct = defaultProducts[index];
            this.product = new products_model_1.Product('', defaultProduct, 0);
            this._productsService.addProduct(this.product).subscribe(() => {
                this.GetProducts();
                this.product.name = '';
                this.openSnackBar('Products loaded', 'OK');
            });
        }
    }
    openSnackBar(message, action) {
        this._snackBar.open(message, action, {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000,
            panelClass: ['blue-snackbar'],
        });
    }
};
__decorate([
    (0, core_1.ViewChild)(paginator_1.MatPaginator)
], ProductsComponent.prototype, "paginator", void 0);
ProductsComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-products',
        templateUrl: './products.component.html',
        styleUrls: ['./products.component.css'],
        providers: [products_service_1.ProductsService, movements_service_1.MovementsService]
    })
], ProductsComponent);
exports.ProductsComponent = ProductsComponent;
