import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table/table';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ChickenLotsService } from '../service/chicken-lots.service';
import { FormControl } from '@angular/forms';
import { ProductionMonitoringsFilter, ProductionMonitoringsService } from '../service/production-monitorings.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-production-monitorings-list',
  templateUrl: './production-monitorings-list.component.html',
  styleUrls: ['./production-monitorings-list.component.css']
})
export class ProductionMonitoringsListComponent implements OnInit {

  filter = new ProductionMonitoringsFilter();
  totalRegisters = 0;
  @ViewChild('table', {static: true}) grid: Table;
  productionMonitorings = [];
  chickenLots = [];

  constructor(
    private productionMonitoringsService: ProductionMonitoringsService,
    private toasty: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private chickenLotsService: ChickenLotsService
  ) { }

  ngOnInit() {
    this.loadChickenLots();
  }

  findByFilter(page = 0) {
    this.filter.page = page;
    this.productionMonitoringsService.findByFilter(this.filter)
    .then(result => {
      this.totalRegisters = result.total;
      this.productionMonitorings = result.productionMonitorings;
    })
    .catch(error => this.errorHandler.handle(error));
}

onChangePage(event: LazyLoadEvent) {
  const page = event.first / event.rows;
  this.findByFilter(page);
}

delete(productionMonitoring: any) {
  this.confirmationService.confirm({
    message: 'Tem certeza que deseja excluir?',
    accept: () => {
      this.productionMonitoringsService.delete(productionMonitoring.id)
      .then(() => {
        this.grid.reset();
        this.toasty.success('Registro excluído com sucesso');
      });
    }
  });
}

loadChickenLots() {
  return this.chickenLotsService.listAll()
    .then(chickenLots => {
      this.chickenLots = chickenLots
        .map(c => {
          return ({ label: c.name, value: c.id });
        });
    })
    .catch(error => this.errorHandler.handle(error));
}

new(form: FormControl) {
  form.reset();
  this.findByFilter();
}

}
