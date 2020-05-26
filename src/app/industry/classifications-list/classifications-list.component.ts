import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassificationsFilter, ClassificationsService } from '../service/classifications.service';
import { Table } from 'primeng/table/table';
import { EggBasesService } from '../service/egg-bases.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-classification-list',
  templateUrl: './classifications-list.component.html',
  styleUrls: ['./classifications-list.component.css']
})
export class ClassificationsListComponent implements OnInit {

  filter = new ClassificationsFilter();
  totalRegisters = 0;
  @ViewChild('table', { static: true }) grid: Table;

  eggBases = [];
  classifications = [];

  button = true;

  constructor(
    private eggBasesService: EggBasesService,
    private toasty: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private classificationsService: ClassificationsService,
    ) { }

  ngOnInit() {
    this.loadEggBases();
  }

  findByFilter(page = 0) {
    this.filter.page = page;

    console.log(this.filter);
    this.classificationsService.findByFilter(this.filter)
      .then(result => {
        this.totalRegisters = result.total;
        this.classifications = result.classifications;
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
        this.classificationsService.delete(eggBase.id)
          .then(() => {
            this.grid.reset();
            this.toasty.success('Classificação excluída com sucesso');
          });
      }
    });
  }

  // loadClassifications() {
  //   return this.classificationsService.listAll()
  //     .then(classifications => {
  //       this.classificationsService = classifications
  //         .map(c => {
  //           return ({ label: c.quantity, value: c.id });
  //         });
  //     })
  //     .catch(error => this.errorHandler.handle(error));
  // }

  loadEggBases() {
    return this.eggBasesService.listAll()
      .then(eggBases => {
        this.eggBases = eggBases
          .map(c => {
            return ({ label: c.eggLot.name, value: c.id});
          });
      })
      .catch(error => this.errorHandler.handle(error));
  }

  new(form: FormControl) {
    form.reset();
    this.findByFilter();
  }

}
