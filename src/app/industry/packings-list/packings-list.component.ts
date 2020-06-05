import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ToastyService } from 'ng2-toasty';
import { PackingsFilter, PackingsService } from '../service/packings.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table/table';

@Component({
  selector: 'app-packings-list',
  templateUrl: './packings-list.component.html',
  styleUrls: ['./packings-list.component.css']
})
export class PackingsListComponent implements OnInit {

  filter = new PackingsFilter();
  totalRegisters = 0;
  @ViewChild('table', {static: true}) grid: Table;
  packings = [];
  showTableDetails = false;

    constructor(
      private packingsService: PackingsService,
      private toasty: ToastyService,
      private confirmationService: ConfirmationService,
      private errorHandler: ErrorHandlerService
      ) { }

  ngOnInit() {
   // this.findByFilter();
  }

  findByFilter(page = 0) {

      this.filter.page = page;
      this.packingsService.findByFilter(this.filter)
      .then(result => {
        this.totalRegisters = result.total;
        this.packings = result.packings;
        console.log(this.packings);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  onChangePage(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.findByFilter(page);
  }

  delete(packing: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.packingsService.delete(packing.id)
        .then(() => {
          this.grid.reset();
          this.toasty.success('Embalagem excluída com sucesso');
        });
      }
    });
  }

  new(form: FormControl) {
    form.reset();
    this.findByFilter();
  }

}
