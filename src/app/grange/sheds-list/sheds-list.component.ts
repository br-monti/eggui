import { FormControl } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ToastyService } from 'ng2-toasty';
import { ShedService } from '../service/shed.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ShedsFilter } from '../service/shed.service';
import { Table } from 'primeng/table/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-shed-list',
  templateUrl: './sheds-list.component.html',
  styleUrls: ['./sheds-list.component.css']
})
export class ShedsListComponent implements OnInit {

  filter = new ShedsFilter();
  totalRegisters = 0;
  @ViewChild('table', {static: true}) grid: Table;
  sheds = [];

  constructor(
    private shedsService: ShedService,
    private toasty: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  findByFilter(page = 0) {

    this.filter.page = page;
    this.shedsService.findByFilter(this.filter)
    .then(result => {
      this.totalRegisters = result.total;
      this.sheds = result.sheds;
    })
    .catch(error => this.errorHandler.handle(error));
}

onChangePage(event: LazyLoadEvent) {
  const page = event.first / event.rows;
  this.findByFilter(page);
}

delete(shed: any) {
  this.confirmationService.confirm({
    message: 'Tem certeza que deseja excluir?',
    accept: () => {
      this.shedsService.delete(shed.id)
      .then(() => {
        this.grid.reset();
        this.toasty.success('Galpão excluído com sucesso');
      });
    }
  });
}

new(form: FormControl) {
  form.reset();
  this.findByFilter();


}


}
