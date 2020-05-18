import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ToastyService } from 'ng2-toasty';
import { EggLotsService, EggLotsFilter } from './../service/egg-lots.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table/table';
import { EggLot } from 'src/app/core/model';

@Component({
  selector: 'app-egg-lots-list',
  templateUrl: './egg-lots-list.component.html',
  styleUrls: ['./egg-lots-list.component.css']
})
export class EggLotsListComponent implements OnInit {

  filter = new EggLotsFilter();
  totalRegisters = 0;
  @ViewChild('table', {static: true}) grid: Table;
  eggLots = [];
  showTableDetails = false;

  eggLotDetails = new EggLot();

    constructor(
      private eggLotsService: EggLotsService,
      private toasty: ToastyService,
      private confirmationService: ConfirmationService,
      private errorHandler: ErrorHandlerService
      ) { }

  ngOnInit() {
   // this.findByFilter();
  }

  findByFilter(page = 0) {

      this.filter.page = page;
      this.eggLotsService.findByFilter(this.filter)
      .then(result => {
        this.totalRegisters = result.total;
        this.eggLots = result.eggLots;
      })
      .catch(error => this.errorHandler.handle(error));
  }

  onChangePage(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.findByFilter(page);
  }

  delete(eggLot: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.eggLotsService.delete(eggLot.id)
        .then(() => {
          this.grid.reset();
          this.toasty.success('Lote excluído com sucesso');
        });
      }
    });
  }

  new(form: FormControl) {
    form.reset();
    this.findByFilter();
  }

  showEggLotDetails(id: number) {
    this.showTableDetails = true;
    this.loadEggLot(id);
  }

  loadEggLot(id: number) {
    this.eggLotsService.findById(id)
    .then (eggLot => {
      this.eggLotDetails = eggLot;
    })
    .catch(error => this.errorHandler.handle(error));
  }

}
