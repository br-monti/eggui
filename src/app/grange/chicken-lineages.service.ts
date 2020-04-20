import { HttpClient, HttpParams  } from '@angular/common/http';
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
 }
