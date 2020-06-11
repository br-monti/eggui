import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ProductsService } from './../service/products.service';
import { Product, EggType, Packing } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { EggTypesService } from '../service/egg-types.service';
import { PackingsService } from '../service/packings.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {

  product = new Product();
  eggTypes = [];
  packings = [];

  eggType = new EggType();
  packing = new Packing();


  productAux = new Product();

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
    })
    .catch(error => this.errorHandler.handle(error));
  }

  save(form: FormControl) {

    this.loadEggType(this.product.eggType.id);
    this.loadPacking(this.product.packing.id);

    // console.log(this.eggType);
    // console.log(this.packing);

    //this.product.nick = `${this.eggType.type} ${this.packing.name}`;
    //console.log(this.product.nick);

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

  loadEggType(id: number) {
    this.eggTypesService.findById(id)
    .then (eggType => {
      this.eggType = eggType;
      console.log(this.eggType);
      this.product.nick = `${this.eggType.type} `;
    })
    //.catch(error => this.errorHandler.handle(error));
  }

  loadPacking(id: number) {
    this.packingsService.findById(id)
    .then (packing => {
     this.packing = packing;     
     console.log(this.packing);
     this.product.nick = `${this.packing.name}`;
    })
    //.catch(error => this.errorHandler.handle(error));
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
            return ({ label: c.name, value: c.id });
          });
      })
      .catch(error => this.errorHandler.handle(error));
  }

}
