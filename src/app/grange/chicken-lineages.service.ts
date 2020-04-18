import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

export  interface ChickenLineageFilter {
  lineage: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChickenLineagesService {

  chickenLineagesUrl  = 'http://localhost:8080/ChickenLineages';

  constructor(private http: HttpClient) { }

  findByFilter(filter: ChickenLineageFilter): Promise<any> {
    let params = new HttpParams();

    if (typeof filter.lineage !== 'undefined' && filter.lineage.length > 0) {
      params =  params.set('lineage', filter.lineage);
    }

    return this.http.get(`${this.chickenLineagesUrl}`, {params})
    .toPromise()
    .then(response => response[`${'content'}`]);
  }
 }
