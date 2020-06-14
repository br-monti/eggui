
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import 'rxjs/add/operator/toPromise';
import { EggLot } from 'src/app/core/model';

export class EggLotsFilter {
  id: number;
  name: string;
  boxColor: string;
  page = 0;
  itensByPage = 50;
}

@Injectable({
  providedIn: 'root'
})
export class EggLotsService {
  eggLotsUrl  = 'http://localhost:8080/EggLots';

  constructor(private http: HttpClient) { }

  findByFilter(filter: EggLotsFilter): Promise<any> {
    let params = new HttpParams();


    params = params.set('page', filter.page.toString());
    params = params.set('size', filter.itensByPage.toString());


    if (filter.id) {
      params =  params.set('id', filter.id.toString());
    }

    if (filter.name) {
      params =  params.set('name', filter.name);
    }

    if (filter.boxColor) {
      params =  params.set('boxColor', filter.boxColor);
    }

    return this.http.get(`${this.eggLotsUrl}`, {params})

    .toPromise()
    .then(response => {
      const eggLots = response[`${'content'}`];
      const result = {
        eggLots,
        total: response[`${'totalElements'}`]
      };
      return result;
    });
  }

  delete(id: number): Promise<void> {

    return this.http.delete(`${this.eggLotsUrl}/${id}`)
    .toPromise()
    .then(() => null);

  }

  create(eggLot: EggLot): Promise<EggLot> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<EggLot>(
      this.eggLotsUrl, eggLot, {headers})
      .toPromise();
  }

    update(eggLot: EggLot): Promise<EggLot> {
      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');

      return this.http.put<EggLot>(
        `${this.eggLotsUrl}/${eggLot.id}`, eggLot, { headers })
        .toPromise()
        .then(response => {
          const eggLotUpdated = response as EggLot;
          return eggLotUpdated;
        });
    }

      findById(id: number): Promise<EggLot> {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');

        return this.http.get(`${this.eggLotsUrl}/${id}` , {headers})
          .toPromise()
          .then(response => {
            const eggLot = response as EggLot;
            return eggLot;
          } );
      }

      listAll(): Promise<any> {
        return this.http.get(this.eggLotsUrl)
          .toPromise()
          .then(response => response[`${'content'}`]);

      }

}
