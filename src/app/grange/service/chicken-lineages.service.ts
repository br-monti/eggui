
import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { ChickenLineage, ChickenLineageInput } from 'src/app/core/model';

export class ChickenLineageFilter {
  lineage: string;
  page = 0;
  itensByPage = 50;
}

@Injectable({
  providedIn: 'root'
})
export class ChickenLineagesService {

  chickenLineagesUrl  = 'http://localhost:8080/ChickenLineages';
  chickenLineageInput = new ChickenLineageInput();

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

    this.toInput(chickenLineage);

    return this.http.post<ChickenLineage>(
      this.chickenLineagesUrl, this.chickenLineageInput, {headers})
      .toPromise();
  }

    update(chickenLineage: ChickenLineage): Promise<ChickenLineage> {
      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');
      
      this.toInput(chickenLineage);

      return this.http.put<ChickenLineage>(
        `${this.chickenLineagesUrl}/${chickenLineage.id}`, this.chickenLineageInput, { headers })
        .toPromise()
        .then(response => {
          const chickenLineageUpdated = response as ChickenLineage;
          return chickenLineageUpdated;
        });
    }

      findById(id: number): Promise<ChickenLineage> {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');

        return this.http.get(`${this.chickenLineagesUrl}/${id}` , {headers})
          .toPromise()
          .then(response => {
            const chickenLineage = response as ChickenLineage;
            return chickenLineage;
          } );
      }

      listAll(): Promise<any> {
        return this.http.get(this.chickenLineagesUrl)
          .toPromise()
          .then(response => response[`${'content'}`]);
      }

      toInput(chickenLineage: ChickenLineage) {
        this.chickenLineageInput.chickenColor = chickenLineage.chickenColor;
        this.chickenLineageInput.lineage = chickenLineage.lineage;
        this.chickenLineageInput.provider = chickenLineage.provider;
      }

 }
