import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserwindowComponent } from './userwindow.component';
import { AppComponent } from '../../app.component';
import { HttpClientModule } from '@angular/common/http';
import { OAuthLogger, DateTimeProvider, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';

describe('UserwindowComponent', () => {
  let component: UserwindowComponent;
  let fixture: ComponentFixture<UserwindowComponent>;

  let appComponent: AppComponent;
  let mockAppComponent = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserwindowComponent, AppComponent ],
      imports: [HttpClientModule],
      providers: [ OAuthLogger,OAuthService,UrlHelperService, DateTimeProvider, AppComponent,
        { provide: appComponent, useValue: mockAppComponent } // provide the mock.
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserwindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
