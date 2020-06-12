import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ProductsService } from './../service/products.service';
import { Product, EggType, Packing } from './../../core/model';
import { Component, OnInit, OnChanges } from '@angular/core';
import { EggTypesService } from '../service/egg-types.service';
import { PackingsService } from '../service/packings.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})

export class ProductsEditComponent implements OnInit {

  product = new Product();
  eggTypes: EggType[];
  packings: Packing[];

  eggTypeSelected: EggType;
  packingSelected: Packing;

  constructor(
    private productsService: ProductsService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private eggTypesService: EggTypesService,
    private packingsService: PackingsService) { }

  ngOnInit() {
    const productId = this.route.snapshot.params[`${'id'}`];

    if (productId) {
      this.loadProduct(productId);
    }

    this.loadEggTypes();
    this.loadPackings();
  }

  get editing() {
    return Boolean(this.product.id);
  }

  loadProduct(id: number) {
    this.productsService.findById(id)
    .then (product => {
      this.product = product;      
      this.eggTypeSelected = this.product.eggType;
      this.packingSelected = this.product.packing;

    })
    .catch(error => this.errorHandler.handle(error));
  }

  save(form: FormControl) {

    this.product.eggType = this.eggTypeSelected;
    this.product.packing = this.packingSelected;
    this.product.nick = `${this.eggTypeSelected.type} ${this.packingSelected.name}`;

    if (this.editing) {
      this.update(form);
    } else {
      this.create (form);
    }

  }

  create(form: FormControl)  {

    this.productsService.create(this.product)
    .then(() => {
      this.toasty.success('Produto adicionado com sucesso');
      this.router.navigate(['/Products']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  update(form: FormControl) {
    this.productsService.update(this.product)
    .then(product  => {
      this.product = product;
      this.toasty.success('Produto alterado com sucesso');
      this.router.navigate(['/Products']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  new(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.product = new Product();
    }.bind(this), 1);
    this.router.navigate(['/Products/new']);
  }

  loadEggTypes() {
    return this.eggTypesService.listAll()
      .then(eggTypes => {
        this.eggTypes = eggTypes
          .map(c => {
            return ({ label: c.type, value: {id: c.id, type: c.type, 
              category: c.category, minWeight: c.minWeight, maxWeight: c.maxWeight}});
          });
      })
      .catch(error => this.errorHandler.handle(error));
  }

  loadPackings() {
    return this.packingsService.listAll()
      .then(packings => {
        this.packings = packings
          .map(c => {
            return ({ label: c.name, value: {id: c.id, name: c.name, packingType: c.packingType,
              quantityByPacking: c.quantityByPacking, packingByBox: c.packingByBox,
               quantityByBox: c.quantityByBox }});
          });
      })
      .catch(error => this.errorHandler.handle(error));
  }

}


