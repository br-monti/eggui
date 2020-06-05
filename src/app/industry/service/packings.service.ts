import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import 'rxjs/add/operator/toPromise';
import { Packing } from 'src/app/core/model';

export class PackingsFilter {
  id: number;
  name: string;
  packingType: string;
  page = 0;
  itensByPage = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PackingsService {
  packingsUrl  = 'http://localhost:8080/Packings';

  constructor(private http: HttpClient) { }

  findByFilter(filter: PackingsFilter): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filter.page.toString());
    params = params.set('size', filter.itensByPage.toString());

    if (filter.id) {
      params =  params.set('id', filter.id.toString());
    }

    if (filter.name) {
      params =  params.set('name', filter.name);
    }

    if (filter.packingType) {
      params =  params.set('packingType', filter.packingType);
    }

    return this.http.get(`${this.packingsUrl}`, {params})
    .toPromise()
    .then(response => {
      const packings = response[`${'content'}`];
      const result = {
        packings,
        total: response[`${'totalElements'}`]
      };
      return result;
    });
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.packingsUrl}/${id}`)
    .toPromise()
    .then(() => null);

  }

  create(packing: Packing): Promise<Packing> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<Packing>(
      this.packingsUrl, packing, {headers})
      .toPromise();
  }

  update(packing: Packing): Promise<Packing> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put<Packing>(
      `${this.packingsUrl}/${packing.id}`, packing, { headers })
      .toPromise()
      .then(response => {
        const packingUpdated = response as Packing;
        return packingUpdated;
      });
  }

  findById(id: number): Promise<Packing> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.packingsUrl}/${id}` , {headers})
      .toPromise()
      .then(response => {
        const packing = response as Packing;
        return packing;
      } );
  }

  listAll(): Promise<any> {
    return this.http.get(this.packingsUrl)
      .toPromise()
      .then(response => response[`${'content'}`]);

  }

}

