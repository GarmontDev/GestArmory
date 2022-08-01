import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Client } from '../models/client';
import { Global } from './global';

@Injectable()
export class ClientsService{
    public url: string;

    constructor(
      private _http: HttpClient
      ){
        this.url = Global.url;
      }

    testService(){
      return 'Probando el servicio de Angular';
    }

    addNewClient(client: Client): Observable<any>{
      let params = JSON.stringify(client);
      let headers = new HttpHeaders().set('Content-Type','application/json');

      return this._http.post(this.url+'save-client', params,{headers: headers});
    }

    getClients(): Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/json');

      return this._http.get(this.url+'clients',{headers: headers});
    }

    deleteClient(id:any): Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/json');

      return this._http.delete(this.url+'client/'+id, {headers: headers});
    }

    updateClient(client:Client): Observable<any>{
      let params = JSON.stringify(client);
      let headers = new HttpHeaders().set('Content-Type','application/json');

      return this._http.put(this.url+'client/'+client._id, params, {headers: headers});
    }

    FetchClients(): Observable<any>{
      return this._http.get('https://dummyjson.com/users');
    }
}
