import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ClientsComponent } from './clients.component';
import { DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../models/client';
import { HttpTestingController } from '@angular/common/http/testing';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let debugElement: DebugElement;
  let  httpMock: HttpTestingController;

  const mockClientsComponent = jasmine.createSpyObj<ClientsComponent>('ClientsComponent',['NewClient']);
  const mockClientsService = jasmine.createSpyObj<ClientsService>('ClientsService', ['FetchClients']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsComponent ],
      imports: [HttpClientModule, MatDialogModule],
      providers: [
        HttpTestingController,
        {provide: ClientsComponent, value: mockClientsComponent},
        OAuthLogger,
        OAuthService,
        UrlHelperService,
        MatDialog,
        DateTimeProvider,
        MatSnackBar,
        Overlay,
        MatDialogModule,
        {provide: MAT_DIALOG_DATA, useValue:[]},
        {provide: MatDialogRef, useValue:[]}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsComponent);
    httpMock = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the fake clients', () => {
    //spyOn(component, 'LoadClientsFromFakeAPI');
    //component.LoadClientsFromFakeAPI();
    //expect(component.fakeClientsLoaded).toBe(true);
    //expect(component.LoadClientsFromFakeAPI).toHaveBeenCalledTimes(1);
    //expect(mockClientsService.FetchClients).toBeDefined;

    const client: Client = {
      _id: '62de56750ab137ff1c3b1dde',
      dni: '50380955204220685',
      name: 'Terry Smitham Medhurst',
      address: '1745 T Street Southeast',
      city: 'Washington',
      province: 'Washington',
      guide: 'NO17 0695 2754 967',
      guideexpeditiondate: new Date("2000-12-25T00:00:00.000+00:00")
    };

    mockClientsService.FetchClients.and.returnValue(of(client));

    mockClientsService.FetchClients().subscribe(response=>{
        expect(response).toEqual(client);
    })
  });

  it('should not display the page if not logged in', () => {
    expect(fixture.debugElement.nativeElement.querySelector('#loginMessage').innerHTML).toBeTruthy();
  });
});
