import { EggLot } from './../../core/model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import 'rxjs/add/operator/toPromise';
import { EggBase } from 'src/app/core/model';

export class EggBasesFilter {
  id: number;
  productionDateInitial: Date;
  productionDateFinal: Date;
  validityDateInitial: Date;
  validityDateFinal: Date;
  eggLot: number;
  page = 0;
  itensByPage = 5;
}

@Injectable({
  providedIn: 'root'
})
export class EggBasesService {
  eggBasesUrl  = 'http://localhost:8080/EggBases';

  constructor(private http: HttpClient) { }

  findByFilter(filter: EggBasesFilter): Promise<any> {
    let params = new HttpParams();


    params = params.set('page', filter.page.toString());
    params = params.set('size', filter.itensByPage.toString());


    if (filter.productionDateInitial) {
      params = params.set('productionDateInitial',
        moment(filter.productionDateInitial).format('YYYY-MM-DD'));

    }

    if (filter.productionDateFinal) {
      params = params.set('productionDateFinal',
        moment(filter.productionDateFinal).format('YYYY-MM-DD'));
    }

    if (filter.validityDateInitial) {
      params = params.set('validityDateInitial',
        moment(filter.validityDateInitial).format('YYYY-MM-DD'));

    }

    if (filter.validityDateFinal) {
      params = params.set('validityDateFinal',
        moment(filter.validityDateFinal).format('YYYY-MM-DD'));
    }

    if (filter.eggLot) {
      params =  params.set('eggLot', filter.eggLot.toString());
    }

    return this.http.get(`${this.eggBasesUrl}`, {params})

    .toPromise()
    .then(response => {
      const eggBases = response[`${'content'}`];
      const result = {
        eggBases,
        total: response[`${'totalElements'}`]
      };
      return result;
    });
  }

  delete(id: number): Promise<void> {

    return this.http.delete(`${this.eggBasesUrl}/${id}`)
    .toPromise()
    .then(() => null);

  }

  create(eggBase: EggBase): Promise<EggBase> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<EggBase>(
      this.eggBasesUrl, eggBase, {headers})
      .toPromise();

  }

    update(eggBase: EggBase): Promise<EggBase> {
      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');

      return this.http.put<EggBase>(
        `${this.eggBasesUrl}/${eggBase.id}`, eggBase, { headers })
        .toPromise()
        .then(response => {
          const eggBaseUpdated = response as EggBase;
          this.convertStringsToDate([eggBaseUpdated]);
          return eggBaseUpdated;
        });
    }

      findById(id: number): Promise<EggBase> {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');

        return this.http.get(`${this.eggBasesUrl}/${id}` , {headers})
          .toPromise()
          .then(response => {
            const eggBase = response as EggBase;
            this.convertStringsToDate([eggBase]);
            return eggBase;
          } );
      }

      listAll(): Promise<any> {
        return this.http.get(this.eggBasesUrl)
          .toPromise()
          .then(response => response[`${'content'}`]);

      }

      private convertStringsToDate(eggBases: EggBase[]) {
        for (const eggBase of eggBases) {

         if (eggBase.productionDate) {
          eggBase.productionDate = moment(eggBase.productionDate,
            'YYYY-MM-DD').toDate();
         }

         if (eggBase.validityDate) {
            eggBase.validityDate = moment(eggBase.validityDate,
              'YYYY-MM-DD').toDate();
          }
        }

      }

}

