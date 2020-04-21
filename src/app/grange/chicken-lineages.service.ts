import { ChickenLineage } from './../core/model';
import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

export class ChickenLineageFilter {
  lineage: string;
  page = 0;
  itensByPage = 5;
}

@Injectable({
  providedIn: 'root'
})
export class ChickenLineagesService {

  chickenLineagesUrl  = 'http://localhost:8080/ChickenLineages';



  constructor(private http: HttpClient) { }

  findByFilter(filter: ChickenLineageFilter): Promise<any> {
    let params = new HttpParams();


    params = params.set('page', filter.page.toString());
    params = params.set('size', filter.itensByPage.toString());


    if (filter.lineage) {
      params =  params.set('lineage', filter.lineage);
    }

    return this.http.get(`${this.chickenLineagesUrl}`, {params})
    .toPromise()
    .then(response => {
      const chickenLineages = response[`${'content'}`];
      const result = {
        chickenLineages,
        total: response[`${'totalElements'}`]
      };
      return result;
    });
  }

  delete(id: number): Promise<void> {

    return this.http.delete(`${this.chickenLineagesUrl}/${id}`)
    .toPromise()
    .then(() => null);

  }

  create(chickenLineage: ChickenLineage): Promise<ChickenLineage> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<ChickenLineage>(
      this.chickenLineagesUrl, chickenLineage, {headers})
      .toPromise();
  }

  update(chickenLineage: ChickenLineage): Promise<ChickenLineage> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put<ChickenLineage>(
      `${this.chickenLineagesUrl}/${chickenLineage.id}`, {headers})
      .toPromise()
      .then(response => {
        const chickenLineageSaved = response[`${'content'}`] as ChickenLineage;
        return chickenLineageSaved;
      });
    }

      findById(id: number): Promise<ChickenLineage> {
        return this.http.get(`${this.chickenLineagesUrl}/${id}`)
          .toPromise()
          .then(response => {
            const chickenLineage = response[`${'content'}`] as ChickenLineage;
            return chickenLineage;
          });
      }





 }
