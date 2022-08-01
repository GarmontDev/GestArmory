import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemovementComponent } from './createmovement.component';
import { MovementsService } from '../../services/movements.service';
import { HttpClientModule } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { Overlay } from '@angular/cdk/overlay';
import { DateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Movement } from '../../models/movement';


describe('CreatemovementComponent', () => {
  let component: CreatemovementComponent;
  let fixture: ComponentFixture<CreatemovementComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, FormsModule],
      declarations: [ CreatemovementComponent ],
      providers: [ Overlay, MovementsService, MatSnackBar, DateAdapter, MatDialog, {provide: MAT_DIALOG_DATA, useValue:[]}, {provide: MatDialogRef, useValue:[]}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatemovementComponent);
    component = fixture.componentInstance;
    //debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it(`seat number bigger than 0`, async () =>{
  //   //spyOn(component, 'GetNewSeatNumber');
  //   //component.GetNewSeatNumber();
  //   //expect(component.GetNewSeatNumber).toHaveBeenCalledTimes(1);
  //   //const value = fixture.debugElement.nativeElement.querySelector('#seatnumber');
  //   fixture.detectChanges();
  //   expect(component.movement.seatNumber).toBeGreaterThan(0);
  //   //expect(value.innerHTML).toBeGreaterThan(0);
  // })
});
