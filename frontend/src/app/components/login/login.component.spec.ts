import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { AppComponent } from '../../app.component';
import { DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, FormsModule],
      declarations: [ LoginComponent ],
      providers: [
        OAuthLogger,
        OAuthService,
        UrlHelperService,
        DateTimeProvider,
        AppComponent,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the login button if not logged in', () => {
    expect(fixture.debugElement.nativeElement.querySelector('#loginButton').innerHTML).toBeTruthy();
  });

  it('should check log in button', () => {
    spyOn(component,'login');
    fixture.nativeElement.querySelector('#loginButton').click();
    expect(component.login).toHaveBeenCalledTimes(1);
  });
});
