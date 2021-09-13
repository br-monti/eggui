import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ShedManufacturerService {

  shedManufacturersUrl = 'http://localhost:8080/ShedManufacturers';

  constructor(private http: HttpClient) { }

  listAll(): Promise<any> {
    return this.http.get(this.shedManufacturersUrl)
      .toPromise()
      .then(response => response[`${'content'}`]);
  }

}
