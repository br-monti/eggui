import { ChickenLineagesService } from './../chicken-lineages.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent} from 'primeng/api/public_api';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table/table';
import { ChickenLineageFilter } from '../chicken-lineages.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-chicken-lineages-list',
  templateUrl: './chicken-lineages-list.component.html',
  styleUrls: ['./chicken-lineages-list.component.css']
})
export class ChickenLineagesListComponent implements OnInit {

  filter = new ChickenLineageFilter();
  totalRegisters = 0;
  @ViewChild('table', {static: true}) grid: Table;
  chickenLineages = [];

    constructor(
      private chickenLineagesService: ChickenLineagesService,
      private toasty: ToastyService,
      private confirmationService: ConfirmationService,
      private errorHandler: ErrorHandlerService
      ) { }

  ngOnInit() {
   // this.findByFilter();
  }

  findByFilter(page = 0) {

      this.filter.page = page;
      this.chickenLineagesService.findByFilter(this.filter)
      .then(result => {
        this.totalRegisters = result.total;
        this.chickenLineages = result.chickenLineages;
      })
      .catch(error => this.errorHandler.handle(error));
  }

  onChangePage(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.findByFilter(page);
  }

  delete(chickenLineage: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.chickenLineagesService.delete(chickenLineage.id)
        .then(() => {
          this.grid.reset();
          this.toasty.success('Linhagem excluída com sucesso');
        });
      }
    });
  }



}
