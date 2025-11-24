import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _URL_LOGIN, _URL_REGISTRO, _URL_PRODUCTS, _URL_DELETE_PRODUCT, _URL_PUT_PRODUCT, _URL_POST_PRODUCT } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private http: HttpClient) {}

  public login(data:any): Observable<any> {
    return this.http.post(_URL_LOGIN, data);
  }

  public register(data:any):Observable<any> {
    return this.http.post(_URL_REGISTRO, data);
  }

  public getProducts(): Observable<any> {
    return this.http.get(_URL_PRODUCTS);
  }

  public delProduct(id:any): Observable<any> {
    return this.http.delete(_URL_DELETE_PRODUCT+id);
  }

  public putProduct(data:any): Observable<any> {
    return this.http.put(_URL_PUT_PRODUCT, data);
  }

  public newProduct(data:any): Observable<any> {
    return this.http.post(_URL_POST_PRODUCT, data);
  }
  
}
