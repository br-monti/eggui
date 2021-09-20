import { Shed, ShedInput } from '../../core/model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

export class ShedsFilter {
  name: string;
  page = 0;
  itensByPage = 50;
}

@Injectable({
  providedIn: 'root'
})
export class ShedService {

  shedsUrl = 'http://localhost:8080/Sheds';
  shedInput = new ShedInput();

  constructor(private http: HttpClient) { }

  findByFilter(filter: ShedsFilter): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filter.page.toString());
    params = params.set('size', filter.itensByPage.toString());

    if (filter.name) {
      params = params.set('name', filter.name);
    }

    return this.http.get(`${this.shedsUrl}`, { params })
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

    this.toInput(shed);

    return this.http.post<Shed>(
      this.shedsUrl, this.shedInput, { headers })
      .toPromise();
  }

  update(shed: Shed): Promise<Shed> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    this.toInput(shed);

    return this.http.put<Shed>(
      `${this.shedsUrl}/${shed.id}`, this.shedInput, { headers })
      .toPromise()
      .then(response => {
        const shedUpdated = response as Shed;
        return shedUpdated;
      });
  }

  findById(id: number): Promise<Shed> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.shedsUrl}/${id}`, { headers })
      .toPromise()
      .then(response => {
        const shed = response as Shed;
        return shed;
      });
  }

  listAll(): Promise<any> {
    return this.http.get(this.shedsUrl)
      .toPromise()
      .then(response => response[`${'content'}`]);
  }

  toInput(shed: Shed) {
    this.shedInput.name = shed.name;
    this.shedInput.type = shed.type;
    this.shedInput.capacity = shed.capacity;
    this.shedInput.model = shed.model;
    this.shedInput.shedManufacturer.id = shed.shedManufacturer.id;
  }

}
