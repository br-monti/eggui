import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table/table';
import { EggBasesFilter, EggBasesService } from '../service/egg-bases.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { EggLotsService } from '../service/egg-lots.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-egg-bases-list',
  templateUrl: './egg-bases-list.component.html',
  styleUrls: ['./egg-bases-list.component.css']
})
export class EggBasesListComponent implements OnInit {


  filter = new EggBasesFilter();
  totalRegisters = 0;
  @ViewChild('table', { static: true }) grid: Table;

  eggBases = [];
  eggLots = [];


  button = true;

  constructor(
    private eggBasesService: EggBasesService,
    private toasty: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private eggLotsService: EggLotsService
    ) { }

  ngOnInit() {
    this.loadEggLots();
  }

  findByFilter(page = 0) {
    this.filter.page = page;
    this.eggBasesService.findByFilter(this.filter)
      .then(result => {
        this.totalRegisters = result.total;
        this.eggBases = result.eggBases;
      })
      .catch(error => this.errorHandler.handle(error));
  }

  onChangePage(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.findByFilter(page);
  }

  delete(eggBase: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.eggBasesService.delete(eggBase.id)
          .then(() => {
            this.grid.reset();
            this.toasty.success('Galpão excluído com sucesso');
          });
      }
    });
  }

  loadEggLots() {
    return this.eggLotsService.listAll()
      .then(eggLots => {
        this.eggLots = eggLots
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
