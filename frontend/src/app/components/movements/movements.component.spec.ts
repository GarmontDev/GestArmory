import { Overlay } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';
import { of } from 'rxjs';
import { Movement } from '../../models/movement';
import { MovementsService } from '../../services/movements.service';

import { MovementsComponent } from './movements.component';

describe('MovementsComponent', () => {
  let component: MovementsComponent;
  let fixture: ComponentFixture<MovementsComponent>;
  const mockMovementsService = jasmine.createSpyObj<MovementsService>('MovementsService', ['getMovements']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, MatDialogModule, RouterTestingModule],
      declarations: [ MovementsComponent ],
      providers: [OAuthLogger,OAuthService, UrlHelperService, MatDialog, DateTimeProvider, MatSnackBar, Overlay, MatDialogModule, {provide: MAT_DIALOG_DATA, useValue:[]}, {provide: MatDialogRef, useValue:[]}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check fetch fake movements', () => {
    spyOn(component, 'LoadMovementsFromFakeAPI');

    component.LoadMovementsFromFakeAPI();

    expect(component.LoadMovementsFromFakeAPI).toHaveBeenCalledTimes(1);
  });

  it(`#getmovements should return a collection of movements`, async () =>{
    const movement: Movement = {
      _id: '62d6b6a6d38a7a5548fd7836',
      seatNumber: 1,
      date: new Date("2000-12-25T00:00:00.000+00:00"),
      product: 'Metalica',
      guide: 'NO17 0695 2754 967',
      client: 'Terry Smitham Medhurst 50380955204220685',
      stock: 80
    };

    mockMovementsService.getMovements.and.returnValue(of(movement));

    mockMovementsService.getMovements().subscribe(response=>{
      expect(response).toEqual(movement);
    })
  });

  it('should not display the page if not logged in', () => {
    expect(fixture.debugElement.nativeElement.querySelector('#loginMessage').innerHTML).toBeTruthy();
  });
});
