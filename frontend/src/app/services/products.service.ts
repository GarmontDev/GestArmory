import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Product } from "../models/products.model";
import { Global } from './global';

@Injectable()
export class ProductsService{

  public url: string;

  constructor(
    private _http: HttpClient
    ){
      this.url = Global.url;
    }

    addProduct(product: Product): Observable<any>{
      let params = JSON.stringify(product);
      let headers = new HttpHeaders().set('Content-Type','application/json');

      return this._http.post(this.url+'save-product', params,{headers: headers});
    }

    getProducts(): Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this._http.get(this.url+'products',{headers: headers});
    }

    deleteProduct(id:any): Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/json');

      return this._http.delete(this.url+'product/'+id, {headers: headers});
    }

    updateProduct(product:Product): Observable<any>{
      let params = JSON.stringify(product);
      let headers = new HttpHeaders().set('Content-Type','application/json');

      return this._http.put(this.url+'product/'+product._id, params, {headers: headers});
    }


}
