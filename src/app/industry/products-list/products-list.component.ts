import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsFilter, ProductsService } from '../service/products.service';
import { Table } from 'primeng/table/table';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { EggTypesService } from '../service/egg-types.service';
import { PackingsService } from '../service/packings.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  filter = new ProductsFilter();
  totalRegisters = 0;
  @ViewChild('table', { static: true }) grid: Table;

  products = [];
  eggTypes = [];
  packings = [];

  constructor(
    private productsService: ProductsService,
    private toasty: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private eggTypesService: EggTypesService,
    private packingsService: PackingsService
    ) { }

  ngOnInit() {
    this.loadEggTypes();
    this.loadPackings();
  }

  findByFilter(page = 0) {
    this.filter.page = page;
    this.productsService.findByFilter(this.filter)
      .then(result => {
        this.totalRegisters = result.total;
        this.products = result.products;
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
        this.productsService.delete(eggBase.id)
          .then(() => {
            this.grid.reset();
            this.toasty.success('Produto excluído com sucesso');
          });
      }
    });
  }

  loadEggTypes() {
    return this.eggTypesService.listAll()
      .then(eggTypes => {
        this.eggTypes = eggTypes
          .map(c => {
            return ({ label: c.type, value: c.id });
          });
      })
      .catch(error => this.errorHandler.handle(error));
  }

  loadPackings() {
    return this.packingsService.listAll()
      .then(packings => {
        this.packings = packings
          .map(c => {
            return ({ label: c.packingType, value: c.id });
          });
      })
      .catch(error => this.errorHandler.handle(error));
  }

  new(form: FormControl) {
    form.reset();
    this.findByFilter();
  }


}

