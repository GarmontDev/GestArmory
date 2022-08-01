import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { Global } from "./global";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  public url: string;
  private expireDate: Date;

  constructor(
    private _http: HttpClient,
    public cookies: CookieService
    ){
      this.url = Global.url;
      this.expireDate = new Date();
    }

  login(user: User): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'/login', user,{headers: headers});
  }

  getUser() {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'/login', {headers: headers});
  }

  addNewUser(user: User): Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'signup', params,{headers: headers});
  }

  setToken(token: string, role: string) {
    this.expireDate.setDate( this.expireDate.getDate() + 7 );
    this.cookies.set('token', token, this.expireDate);
    this.cookies.set('role', role, this.expireDate);
  }

  getToken() {
    return this.cookies.get('token');
  }

  deleteToken(){
    this.cookies.delete('token');
  }
}
