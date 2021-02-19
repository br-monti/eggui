import { EggBasesService } from './../service/egg-bases.service';
import { ClassificationsService } from './../service/classifications.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ProductsService } from './../service/products.service';
import { Product, EggType, Packing, Classification, EggBase } from './../../core/model';
import { Component, OnInit, OnChanges } from '@angular/core';
import { EggTypesService } from '../service/egg-types.service';
import { PackingsService } from '../service/packings.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})

export class ProductsEditComponent implements OnInit {

  classification = new Classification();
  showEggBaseForm = false;
  eggBase: EggBase;
  classifications: Classification[];
  eggBases = [];
  eggTypes = [];
  products: Product[];
  quantitys = [];

  constructor(
    private classificationsService: ClassificationsService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private eggBasesService: EggBasesService,
    private productsService: ProductsService) { }

  ngOnInit() {
    const eggBaseId = this.route.snapshot.params[`${'id'}`];
    this.loadProducts();
    if (eggBaseId) {
      this.eggBase = new EggBase();
      this.loadEggBase(eggBaseId);
    }

  }

  get editing() {
    return Boolean(this.eggBase.id);
  }

  loadEggBase(id: number) {

    this.eggBasesService.findById(id)
      .then(eggBase => {
        this.eggBase = eggBase;

        this.eggBase.classifications.forEach(classification => {
          classification.products = this.products;
        });

        console.log(this.eggBases);
        this.eggBases.push(eggBase);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  loadProducts() {
    return this.productsService.listAll()
      .then(products => {
        this.products = products
      })
      .catch(error => this.errorHandler.handle(error));
  }

  save(form: FormControl) {
    if (this.editing) {
      this.create(form);
    } else {
      this.create(form);
    }
  }

  create(form: FormControl) {

    this.eggBase.classifications = this.classifications;
    this.eggBase.industryStatus = 'Classification';
    this.eggBasesService.update(this.eggBase)

      .then(() => {
        this.toasty.success('Classificação adicionada com sucesso');
        this.router.navigate(['/Classifications']);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  update(form: FormControl) {
    this.classificationsService.update(this.classification)
      .then(classification => {
        this.classification = classification;
        this.toasty.success('Classificação alterada com sucesso"');
        this.router.navigate(['/Classifications']);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  new(form: FormControl) {
    form.reset();

    setTimeout(function () {
      this.classification = new Classification();
    }.bind(this), 1);

    this.router.navigate(['/Classifications/new']);
  }


}
