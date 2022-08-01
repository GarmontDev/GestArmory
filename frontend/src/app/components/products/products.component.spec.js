"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const products_component_1 = require("./products.component");
const products_service_1 = require("../../services/products.service");
const testing_2 = require("@angular/common/http/testing");
const http_1 = require("@angular/common/http");
const angular_oauth2_oidc_1 = require("angular-oauth2-oidc");
const snack_bar_1 = require("@angular/material/snack-bar");
const overlay_1 = require("@angular/cdk/overlay");
const dialog_1 = require("@angular/material/dialog");
const rxjs_1 = require("rxjs");
describe('ProductsComponent', () => {
    let component;
    //let mockProductsService: ProductsService;
    let fixture;
    // make sure you create this spy object with getProducts public method to be mocked
    const mockProductsService = jasmine.createSpyObj('ProductsService', ['getProducts']);
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            declarations: [products_component_1.ProductsComponent],
            imports: [http_1.HttpClientModule, testing_2.HttpClientTestingModule, dialog_1.MatDialogModule],
            providers: [
                { provide: products_service_1.ProductsService, useValue: mockProductsService },
                angular_oauth2_oidc_1.OAuthLogger,
                angular_oauth2_oidc_1.UrlHelperService,
                angular_oauth2_oidc_1.OAuthService,
                angular_oauth2_oidc_1.DateTimeProvider,
                snack_bar_1.MatSnackBar,
                overlay_1.Overlay,
                dialog_1.MatDialogModule,
                { provide: dialog_1.MAT_DIALOG_DATA, useValue: [] },
                { provide: dialog_1.MatDialogRef, useValue: [] }
            ]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(products_component_1.ProductsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('Load default products', () => {
        spyOn(component, 'LoadDefaultProducts');
        component.LoadDefaultProducts();
        expect(component.LoadDefaultProducts).toHaveBeenCalledTimes(1);
    });
    describe('Testing getProducts function', () => {
        it('should return a collection of products', () => {
            const products = [
                {
                    _id: '62d6b6a6d38a7a5548fd7836',
                    name: 'Metalica',
                    stock: 80
                },
                {
                    _id: '62d6b6a6d38a7a5548fd7838',
                    name: 'Fogueo',
                    stock: 85
                }
            ];
            mockProductsService.getProducts.and.returnValue((0, rxjs_1.of)(products));
            mockProductsService.getProducts().subscribe(response => {
                expect(response).toEqual(products);
            });
            //expect(mockProductsService.getProducts).toHaveBeenCalled();
        });
    });
    it('should not display the page if not logged in', () => {
        expect(fixture.debugElement.nativeElement.querySelector('#loginMessage').innerHTML).toBeTruthy();
    });
});
