import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = environment.api;
  private user = environment.user;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      Authorization: `BEARER ${token}`,
      accept: 'application/json'
    });
  }

  async auth() {
    const url = `${this.api}/v1/signin`;
    return await this.http.post(url, this.user).toPromise();
  }

  get() {
    const url = `${this.api}/v1/products`;
    return this.http.get(url, {headers: this.headers});
  }

  create(product: Product) {
    const url  = `${this.api}/v1/products`;
    return this.http.post(url, product, {headers: this.headers});
  }

  paginate(url: string) {
    return this.http.get(url, {headers: this.headers});
  }

  delete(id: number) {
    const url = `${this.api}/v1/product/${id}`;
    return this.http.delete(url, {headers: this.headers});
  }
}
