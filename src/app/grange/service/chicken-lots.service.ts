
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import 'rxjs/add/operator/toPromise';
import { ChickenLot } from 'src/app/core/model';

export class ChickenLotsFilter {
  id: number;
  birthDateInitial: Date;
  birthDateFinal: Date;
  shed: number;
  page = 0;
  itensByPage = 50;
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

    if (filter.shed) {
      params =  params.set('shed', filter.shed.toString());
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
          this.convertStringsToDate([chickenLotUpdated]);
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
            this.convertStringsToDate([chickenLot]);
            return chickenLot;
          } );
      }

      listAll(): Promise<any> {
        return this.http.get(this.chickenLotsUrl)
          .toPromise()
          .then(response => response[`${'content'}`]);
      }

      private convertStringsToDate(chickenLots: ChickenLot[]) {
        for (const chickenLot of chickenLots) {

         if (chickenLot.birthDate) {
          chickenLot.birthDate = moment(chickenLot.birthDate,
            'YYYY-MM-DD').toDate();
         }

         if (chickenLot.accommodationDate) {
            chickenLot.accommodationDate = moment(chickenLot.accommodationDate,
              'YYYY-MM-DD').toDate();
          }
        }

      }

}
