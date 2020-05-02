import { FormControl } from '@angular/forms';
import { CreationMonitoringsService, CreationMonitoringsFilter } from './../creation-monitorings.service';
import { ShedService } from './../shed.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ToastyService } from 'ng2-toasty';
import { ChickenLotsFilter, ChickenLotsService } from './../chicken-lots.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table/table';

@Component({
  selector: 'app-creation-monitorings-list',
  templateUrl: './creation-monitorings-list.component.html',
  styleUrls: ['./creation-monitorings-list.component.css']
})
export class CreationMonitoringsListComponent implements OnInit {

  filter = new CreationMonitoringsFilter();
  totalRegisters = 0;
  @ViewChild('table', {static: true}) grid: Table;
  creationMonitorings = [];
  chickenLots = [];

  constructor(
    private creationMonitoringsService: CreationMonitoringsService,
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
    this.creationMonitoringsService.findByFilter(this.filter)
    .then(result => {
      this.totalRegisters = result.total;
      this.creationMonitorings = result.creationMonitorings;
    })
    .catch(error => this.errorHandler.handle(error));
}

onChangePage(event: LazyLoadEvent) {
  const page = event.first / event.rows;
  this.findByFilter(page);
}

delete(creationMonitoring: any) {
  this.confirmationService.confirm({
    message: 'Tem certeza que deseja excluir?',
    accept: () => {
      this.creationMonitoringsService.delete(creationMonitoring.id)
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
