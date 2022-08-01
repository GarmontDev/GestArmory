import { Overlay } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PdfreportComponent } from './pdfreport.component';

describe('PdfreportComponent', () => {
  let component: PdfreportComponent;
  let fixture: ComponentFixture<PdfreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, FormsModule],
      declarations: [ PdfreportComponent ],
      providers: [MatSnackBar, Overlay, DateAdapter, MatDialog, {provide: MAT_DIALOG_DATA, useValue:[]}, {provide: MatDialogRef, useValue:[]}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
