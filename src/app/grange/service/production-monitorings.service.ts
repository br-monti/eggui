import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { ProductionMonitoring, ProductionMonitoringInput } from 'src/app/core/model';

export class ProductionMonitoringsFilter {
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
export class ProductionMonitoringsService {

  productionMonitoringsUrl = 'http://localhost:8080/ProductionMonitorings';
  productionMonitoringInput = new ProductionMonitoringInput();

  constructor(private http: HttpClient) { }

  findByFilter(filter: ProductionMonitoringsFilter): Promise<any> {
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
      params = params.set('chickenLot', filter.chickenLot.toString());
    }

    return this.http.get(`${this.productionMonitoringsUrl}`, { params })

      .toPromise()
      .then(response => {
        const productionMonitorings = response[`${'content'}`];
        const result = {
          productionMonitorings: productionMonitorings,
          total: response[`${'totalElements'}`]
        };
        return result;
      });
  }

  delete(id: number): Promise<void> {

    return this.http.delete(`${this.productionMonitoringsUrl}/${id}`)
      .toPromise()
      .then(() => null);

  }

  create(productionMonitoring: ProductionMonitoring): Promise<ProductionMonitoring> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    this.toInput(productionMonitoring);
    return this.http.post<ProductionMonitoring>(
      this.productionMonitoringsUrl, productionMonitoring, { headers })
      .toPromise();
  }

  update(productionMonitoring: ProductionMonitoring): Promise<ProductionMonitoring> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    this.toInput(productionMonitoring);
    return this.http.put<ProductionMonitoring>(
      `${this.productionMonitoringsUrl}/${productionMonitoring.id}`, productionMonitoring, { headers })
      .toPromise()
      .then(response => {
        const productionMonitoringUpdated = response as ProductionMonitoring;
        this.convertStringsToDate([productionMonitoringUpdated]);
        return productionMonitoringUpdated;
      });
  }

  findById(id: number): Promise<ProductionMonitoring> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.productionMonitoringsUrl}/${id}`, { headers })
      .toPromise()
      .then(response => {
        const productionMonitoring = response as ProductionMonitoring;
        this.convertStringsToDate([productionMonitoring]);
        return productionMonitoring;
      });
  }

  listAll(): Promise<any> {
    return this.http.get(this.productionMonitoringsUrl)
      .toPromise()
      .then(response => response[`${'content'}`]);
  }

  private convertStringsToDate(productionMonitorings: ProductionMonitoring[]) {
    for (const productionMonitoring of productionMonitorings) {

      if (productionMonitoring.dateWeek) {
        productionMonitoring.dateWeek = moment(productionMonitoring.dateWeek,
          'YYYY-MM-DD').toDate();
      }

    }

  }

  toInput(productionMonitoring: ProductionMonitoring) {
    this.productionMonitoringInput.ageWeek = productionMonitoring.ageWeek;
    this.productionMonitoringInput.ageDay = productionMonitoring.ageDay;
    this.productionMonitoringInput.dateWeek = productionMonitoring.dateWeek;
    this.productionMonitoringInput.bodyWeight = productionMonitoring.bodyWeight;
    this.productionMonitoringInput.food = productionMonitoring.food;
    this.productionMonitoringInput.water = productionMonitoring.water;
    this.productionMonitoringInput.discard = productionMonitoring.discard;
    this.productionMonitoringInput.mortality = productionMonitoring.mortality;
    this.productionMonitoringInput.chickenLot.id = productionMonitoring.chickenLot.id;
  }

}
