import { Shed } from '../core/model';
import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

export class ShedsFilter {
  name: string;
  page = 0;
  itensByPage = 5;
}

@Injectable({
  providedIn: 'root'
})
export class ShedService {

  shedsUrl  = 'http://localhost:8080/Sheds';

  constructor(private http: HttpClient) { }

  findByFilter(filter: ShedsFilter): Promise<any> {
    let params = new HttpParams();


    params = params.set('page', filter.page.toString());
    params = params.set('size', filter.itensByPage.toString());


    if (filter.name) {
      params =  params.set('name', filter.name);
    }

    return this.http.get(`${this.shedsUrl}`, {params})
    .toPromise()
    .then(response => {
      const sheds = response[`${'content'}`];
      const result = {
        sheds,
        total: response[`${'totalElements'}`]
      };
      return result;
    });
  }

  delete(id: number): Promise<void> {

    return this.http.delete(`${this.shedsUrl}/${id}`)
    .toPromise()
    .then(() => null);

  }

  create(shed: Shed): Promise<Shed> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<Shed>(
      this.shedsUrl, shed, {headers})
      .toPromise();
  }

    update(shed: Shed): Promise<Shed> {
      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');

      return this.http.put<Shed>(
        `${this.shedsUrl}/${shed.id}`, shed, { headers })
        .toPromise()
        .then(response => {
          const shedUpdated = response as Shed;
          return shedUpdated;
        });
    }

      findById(id: number): Promise<Shed> {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');

        return this.http.get(`${this.shedsUrl}/${id}` , {headers})
          .toPromise()
          .then(response => {
            const shed = response as Shed;
            return shed;
          } );
      }

      listAll(): Promise<any> {
        return this.http.get(this.shedsUrl)
          .toPromise()
          .then(response => response[`${'content'}`]);
      }

 }
