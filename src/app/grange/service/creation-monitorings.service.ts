
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { CreationMonitoring } from 'src/app/core/model';

export class CreationMonitoringsFilter {
  id: number;
  dateWeekInitial: Date;
  dateWeekFinal: Date;
  chickenLot: number;
  page = 0;
  itensByPage = 50;
}

@Injectable({
  providedIn: 'root'
})
export class CreationMonitoringsService {

  creationMonitoringsUrl  = 'http://localhost:8080/CreationMonitorings';

  constructor(private http: HttpClient) { }

  findByFilter(filter: CreationMonitoringsFilter): Promise<any> {
    let params = new HttpParams();


    params = params.set('page', filter.page.toString());
    params = params.set('size', filter.itensByPage.toString());

    if (filter.dateWeekInitial) {
      params = params.set('dateWeekInitial',
        moment(filter.dateWeekInitial).format('YYYY-MM-DD'));
    }

    if (filter.dateWeekFinal) {
      params = params.set('dateWeekFinal',
        moment(filter.dateWeekFinal).format('YYYY-MM-DD'));
    }

    if (filter.chickenLot) {
      params =  params.set('chickenLot', filter.chickenLot.toString());
    }

    return this.http.get(`${this.creationMonitoringsUrl}`, {params})

    .toPromise()
    .then(response => {
      const creationMonitorings = response[`${'content'}`];
      const result = {
        creationMonitorings,
        total: response[`${'totalElements'}`]
      };
      return result;
    });
  }

  delete(id: number): Promise<void> {

    return this.http.delete(`${this.creationMonitoringsUrl}/${id}`)
    .toPromise()
    .then(() => null);

  }

  create(creationMonitoring: CreationMonitoring): Promise<CreationMonitoring> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<CreationMonitoring>(
      this.creationMonitoringsUrl, creationMonitoring, {headers})
      .toPromise();
  }

    update(creationMonitoring: CreationMonitoring): Promise<CreationMonitoring> {
      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');

      return this.http.put<CreationMonitoring>(
        `${this.creationMonitoringsUrl}/${creationMonitoring.id}`, creationMonitoring, { headers })
        .toPromise()
        .then(response => {
          const creationMonitoringUpdated = response as CreationMonitoring;
          this.convertStringsToDate([creationMonitoringUpdated]);
          return creationMonitoringUpdated;
        });
    }

      findById(id: number): Promise<CreationMonitoring> {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');

        return this.http.get(`${this.creationMonitoringsUrl}/${id}` , {headers})
          .toPromise()
          .then(response => {
            const creationMonitoring = response as CreationMonitoring;
            this.convertStringsToDate([creationMonitoring]);
            return creationMonitoring;
          } );
      }

      listAll(): Promise<any> {
        return this.http.get(this.creationMonitoringsUrl)
          .toPromise()
          .then(response => response[`${'content'}`]);
      }

      private convertStringsToDate(creationMonitorings: CreationMonitoring[]) {
        for (const creationMonitring of creationMonitorings) {

         if (creationMonitring.dateWeek) {
          creationMonitring.dateWeek = moment(creationMonitring.dateWeek,
            'YYYY-MM-DD').toDate();
         }

         }

      }

}
