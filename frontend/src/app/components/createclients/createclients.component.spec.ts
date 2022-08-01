import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CreateclientsComponent } from './createclients.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { DateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('CreateclientsComponent', () => {
  let component: CreateclientsComponent;
  let fixture: ComponentFixture<CreateclientsComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, FormsModule],
      declarations: [ CreateclientsComponent ],
      providers: [MatSnackBar, Overlay, DateAdapter, MatDialog, {provide: MAT_DIALOG_DATA, useValue:[]}, {provide: MatDialogRef, useValue:[]}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateclientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('check date automatically loaded', async ()=>{
  //   let date = fixture.debugElement.query(By.css("#guideexpeditiondate"))
  //   //expect(date.nativeElement.html().toContain('1');
  //   expect(date.nativeElement.html).toBeDefined;
  // })

  //it('check date automatically loaded',async () => {
    // const date = fixture.debugElement.nativeElement.querySelector('#guideexpeditiondate');
    // expect(date.innerHTML).toBe('Yes');
  //});
});
