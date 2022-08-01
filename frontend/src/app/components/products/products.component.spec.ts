import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.model';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { OAuthLogger, DateTimeProvider, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  //let mockProductsService: ProductsService;
  let fixture: ComponentFixture<ProductsComponent>;

  // make sure you create this spy object with getProducts public method to be mocked
  const mockProductsService = jasmine.createSpyObj<ProductsService>('ProductsService', ['getProducts']);

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      imports: [HttpClientModule ,HttpClientTestingModule, MatDialogModule],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        OAuthLogger,
        UrlHelperService,
        OAuthService,
        DateTimeProvider,
        MatSnackBar,
        Overlay,
        MatDialogModule,
        {provide: MAT_DIALOG_DATA, useValue:[]},
        {provide: MatDialogRef, useValue:[]}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

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
      const products: Product[] = [
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

      mockProductsService.getProducts.and.returnValue(of(products));

      mockProductsService.getProducts().subscribe(response=>{
        expect(response).toEqual(products);
      })
      //expect(mockProductsService.getProducts).toHaveBeenCalled();
    });
  });

  it('should not display the page if not logged in', () => {
    expect(fixture.debugElement.nativeElement.querySelector('#loginMessage').innerHTML).toBeTruthy();
  });
});
