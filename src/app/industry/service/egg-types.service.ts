import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import 'rxjs/add/operator/toPromise';
import { EggType } from 'src/app/core/model';

export class EggTypesFilter {
  id: number;
  type: string;
  category: string;
  page = 0;
  itensByPage = 5;
}

@Injectable({
  providedIn: 'root'
})
export class EggTypesService {
  eggTypesUrl  = 'http://localhost:8080/EggTypes';

  constructor(private http: HttpClient) { }

  findByFilter(filter: EggTypesFilter): Promise<any> {
    let params = new HttpParams();


    params = params.set('page', filter.page.toString());
    params = params.set('size', filter.itensByPage.toString());


    if (filter.id) {
      params =  params.set('id', filter.id.toString());
    }

    if (filter.type) {
      params =  params.set('type', filter.type);
    }

    if (filter.category) {
      params =  params.set('category', filter.category);
    }

    return this.http.get(`${this.eggTypesUrl}`, {params})

    .toPromise()
    .then(response => {
      const eggTypes = response[`${'content'}`];
      const result = {
        eggTypes,
        total: response[`${'totalElements'}`]
      };
      return result;
    });
  }

  delete(id: number): Promise<void> {

    return this.http.delete(`${this.eggTypesUrl}/${id}`)
    .toPromise()
    .then(() => null);

  }

  create(eggType: EggType): Promise<EggType> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<EggType>(
      this.eggTypesUrl, eggType, {headers})
      .toPromise();
  }

  update(eggType: EggType): Promise<EggType> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put<EggType>(
      `${this.eggTypesUrl}/${eggType.id}`, eggType, { headers })
      .toPromise()
      .then(response => {
        const eggBaseUpdated = response as EggType;
        return eggBaseUpdated;
      });
  }

  findById(id: number): Promise<EggType> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.eggTypesUrl}/${id}` , {headers})
      .toPromise()
      .then(response => {
        const eggType = response as EggType;
        return eggType;
      } );
  }

  listAll(): Promise<any> {
    return this.http.get(this.eggTypesUrl)
      .toPromise()
      .then(response => response[`${'content'}`]);

  }

}
