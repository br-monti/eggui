import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import 'rxjs/add/operator/toPromise';
import { Classification } from 'src/app/core/model';

export class ClassificationsFilter {
  id: number;
  eggBase: number;
  page = 0;
  itensByPage = 5;
}

@Injectable({
  providedIn: 'root'
})
export class ClassificationsService {

  classificationsUrl  = 'http://localhost:8080/Classifications';

  constructor(private http: HttpClient) { }

  findByFilter(filter: ClassificationsFilter): Promise<any> {
    let params = new HttpParams();


    params = params.set('page', filter.page.toString());
    params = params.set('size', filter.itensByPage.toString());


    if (filter.id) {
      params =  params.set('id', filter.id.toString());
    }

    if (filter.eggBase) {
      params =  params.set('eggBase', filter.eggBase.toString());
    }

    return this.http.get(`${this.classificationsUrl}`, {params})

    .toPromise()
    .then(response => {
      const classifications = response[`${'content'}`];
      const result = {
        classifications,
        total: response[`${'totalElements'}`]
      };
      return result;
    });
  }

  delete(id: number): Promise<void> {

    return this.http.delete(`${this.classificationsUrl}/${id}`)
    .toPromise()
    .then(() => null);

  }

  create(classification: Classification): Promise<Classification> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<Classification>(
      this.classificationsUrl, classification, {headers})
      .toPromise();
  }

    update(classification: Classification): Promise<Classification> {
      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');

      return this.http.put<Classification>(
        `${this.classificationsUrl}/${classification.id}`, classification, { headers })
        .toPromise()
        .then(response => {
          const classificationUpdated = response as Classification;
          return classificationUpdated;
        });
    }

      findById(id: number): Promise<Classification> {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');

        return this.http.get(`${this.classificationsUrl}/${id}` , {headers})
          .toPromise()
          .then(response => {
            const classification = response as Classification;
            return classification;
          } );
      }

      listAll(): Promise<any> {
        return this.http.get(this.classificationsUrl)
          .toPromise()
          .then(response => response[`${'content'}`]);

      }

}
