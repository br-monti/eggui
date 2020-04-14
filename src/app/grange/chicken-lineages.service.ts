import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class ChickenLineagesService {

  chickenLineagesUrl  = 'http://localhost:8080/ChickenLineages';

  constructor(private http: HttpClient) { }

  list(): Promise<any> {

    return this.http.get(`${this.chickenLineagesUrl}`)
    .toPromise()
    .then(response => response);
  }
 }
