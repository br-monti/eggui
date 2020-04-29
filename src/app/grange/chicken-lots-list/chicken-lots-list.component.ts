import { LazyLoadEvent } from 'primeng/api/public_api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ConfirmationService } from 'primeng/api';
import { ToastyService } from 'ng2-toasty';
import { ChickenLotsFilter, ChickenLotsService } from './../chicken-lots.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table/table';

@Component({
  selector: 'app-chicken-lots-list',
  templateUrl: './chicken-lots-list.component.html',
  styleUrls: ['./chicken-lots-list.component.css']
})
export class ChickenLotsListComponent implements OnInit {

  filter = new ChickenLotsFilter();
  totalRegisters = 0;
  @ViewChild('table', {static: true}) grid: Table;
  chickenLots = [];

  constructor(
    private chickenLotsService: ChickenLotsService,
    private toasty: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  findByFilter(page = 0) {

    this.filter.page = page;
    this.chickenLotsService.findByFilter(this.filter)
    .then(result => {
      this.totalRegisters = result.total;
      this.chickenLots = result.chickenLots;
    })
    .catch(error => this.errorHandler.handle(error));
}

onChangePage(event: LazyLoadEvent) {
  const page = event.first / event.rows;
  this.findByFilter(page);
}

delete(chickenLot: any) {
  this.confirmationService.confirm({
    message: 'Tem certeza que deseja excluir?',
    accept: () => {
      this.chickenLotsService.delete(chickenLot.id)
      .then(() => {
        this.grid.reset();
        this.toasty.success('Galpão excluído com sucesso');
      });
    }
  });
}


}
