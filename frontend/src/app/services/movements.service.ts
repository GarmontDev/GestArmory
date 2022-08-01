import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Movement } from '../models/movement';
import { Global } from './global';

@Injectable()
export class MovementsService{
    public url: string;

    constructor(
      private _http: HttpClient
      ){
        this.url = Global.url;
      }

    testService(){
      return 'Probando el servicio de Angular';
    }

    addNewmovement(movement: Movement): Observable<any>{
      let params = JSON.stringify(movement);
      let headers = new HttpHeaders().set('Content-Type','application/json');

      return this._http.post(this.url+'save-movement', params,{headers: headers});
    }

    getMovements(): Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this._http.get(this.url+'movements',{headers: headers});
    }

    deleteMovement(id:any): Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/json');

      return this._http.delete(this.url+'movement/'+id, {headers: headers});
    }

    updateMovement(movement:Movement): Observable<any>{
      let params = JSON.stringify(movement);
      let headers = new HttpHeaders().set('Content-Type','application/json');

      return this._http.put(this.url+'movement/'+movement._id, params, {headers: headers});
    }

    FetchMovements(): Observable<any>{
      return this._http.get('https://dummyjson.com/users');
    }
}
