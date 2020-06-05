import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import 'rxjs/add/operator/toPromise';
import { Product } from 'src/app/core/model';

export class ProductsFilter {
  id: number;
  packing: number;
  eggType: number;
  page = 0;
  itensByPage = 5;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsUrl  = 'http://localhost:8080/Products';

  constructor(private http: HttpClient) { }

  findByFilter(filter: ProductsFilter): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filter.page.toString());
    params = params.set('size', filter.itensByPage.toString());

    if (filter.id) {
      params =  params.set('id', filter.id.toString());
    }

    if (filter.packing) {
      params =  params.set('packing', filter.packing.toString());
    }

    if (filter.eggType) {
      params =  params.set('eggType', filter.eggType.toString());
    }

    return this.http.get(`${this.productsUrl}`, {params})
    .toPromise()
    .then(response => {
      const products = response[`${'content'}`];
      const result = {
        products,
        total: response[`${'totalElements'}`]
      };
      return result;
    });
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.productsUrl}/${id}`)
    .toPromise()
    .then(() => null);

  }

  create(product: Product): Promise<Product> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<Product>(
      this.productsUrl, product, {headers})
      .toPromise();
  }

  update(product: Product): Promise<Product> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put<Product>(
      `${this.productsUrl}/${product.id}`, product, { headers })
      .toPromise()
      .then(response => {
        const productUpdated = response as Product;
        return productUpdated;
      });
  }

  findById(id: number): Promise<Product> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.productsUrl}/${id}` , {headers})
      .toPromise()
      .then(response => {
        const product = response as Product;
        return product;
      } );
  }

  listAll(): Promise<any> {
    return this.http.get(this.productsUrl)
      .toPromise()
      .then(response => response[`${'content'}`]);

  }

}


