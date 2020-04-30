import { ChickenLot } from './../core/model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import 'rxjs/add/operator/toPromise';

export class ChickenLotsFilter {
  id: number;
  birthDateInitial: Date;
  birthDateFinal: Date;
  page = 0;
  itensByPage = 5;
}

@Injectable({
  providedIn: 'root'
})
export class ChickenLotsService {

  chickenLotsUrl  = 'http://localhost:8080/ChickenLots';

  constructor(private http: HttpClient) { }

  findByFilter(filter: ChickenLotsFilter): Promise<any> {
    let params = new HttpParams();


    params = params.set('page', filter.page.toString());
    params = params.set('size', filter.itensByPage.toString());


    if (filter.id) {
      params =  params.set('id', filter.id.toString());
    }

    if (filter.birthDateInitial) {
      params = params.set('birthDateInitial',
        moment(filter.birthDateInitial).format('YYYY-MM-DD'));

    }

    if (filter.birthDateFinal) {
      params = params.set('birthDateFinal',
        moment(filter.birthDateFinal).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.chickenLotsUrl}`, {params})

    .toPromise()
    .then(response => {
      const chickenLots = response[`${'content'}`];
      const result = {
        chickenLots,
        total: response[`${'totalElements'}`]
      };
      return result;
    });
  }

  delete(id: number): Promise<void> {

    return this.http.delete(`${this.chickenLotsUrl}/${id}`)
    .toPromise()
    .then(() => null);

  }

  create(chickenLot: ChickenLot): Promise<ChickenLot> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<ChickenLot>(
      this.chickenLotsUrl, chickenLot, {headers})
      .toPromise();
  }

    update(chickenLot: ChickenLot): Promise<ChickenLot> {
      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');

      return this.http.put<ChickenLot>(
        `${this.chickenLotsUrl}/${chickenLot.id}`, chickenLot, { headers })
        .toPromise()
        .then(response => {
          const chickenLotUpdated = response as ChickenLot;
          return chickenLotUpdated;
        });
    }

      findById(id: number): Promise<ChickenLot> {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');

        return this.http.get(`${this.chickenLotsUrl}/${id}` , {headers})
          .toPromise()
          .then(response => {
            const chickenLot = response as ChickenLot;
            return chickenLot;
          } );
      }

}
