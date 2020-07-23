import { EggBasesService } from './../service/egg-bases.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ClassificationsService } from './../service/classifications.service';
import { Classification, EggBase, EggType, Product } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { EggTypesService } from '../service/egg-types.service';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-classifications-edit',
  templateUrl: './classifications-edit.component.html',
  styleUrls: ['./classifications-edit.component.css']
})
export class ClassificationsEditComponent implements OnInit {

  classification = new Classification();
  classificationAux: Classification;
  showEggBaseForm = false;
  eggBase: EggBase;
  classifications: Classification[];
  eggBases = [];
  products = [];
  quantitys = [];

  success: boolean;
  error: any;

  buttonName = 'Adicionar';
  icon = 'pi pi-plus';

  constructor(
    private classificationsService: ClassificationsService,
    private productsService: ProductsService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private eggBasesService: EggBasesService) { }

  ngOnInit() {
    const classificationId = this.route.snapshot.params[`${'id'}`];

    if (classificationId) {
      this.loadClassification(classificationId);
    }
    this.loadProducts();
  }

  prepareNewEggBase() {
    this.showEggBaseForm = true;
    this.eggBase = new EggBase();
    this.eggBases.splice(0, this.eggBases.length);
  }

  get editing() {
    return Boolean(this.classification.id);
  }

  loadClassification(id: number) {

    this.buttonName = 'Trocar';
    this.icon = 'pi pi-refresh';
    this.classificationsService.findById(id)
    .then (classification => {
      this.classification = classification;
      // this.eggBases.splice(0, this.eggBases.length);
      // this.eggBases.push(this.classification.eggBase);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  loadProducts() {
    return this.productsService.listAll()
      .then(products => {
        this.products = products;
        this.classifications = new Array<Classification>();
        for (const product of this.products) {
          this.classificationAux = new Classification();
          this.classificationAux.product = product;
          //this.classificationAux.quantity = 0;
          this.classifications.push(this.classificationAux);
        }
      })
      .catch(error => this.errorHandler.handle(error));
  }

  save(form: FormControl) {
    if (this.editing) {
      this.update(form);
    } else {
      this.create (form);
    }
  }

  create(form: FormControl)  {

     this.eggBase.classifications = this.classifications;
     console.log(this.eggBase);
     this.eggBasesService.update(this.eggBase)

    .then(() => {
      this.toasty.success('Classificação adicionada com sucesso');
      this.router.navigate(['/Classifications']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  update(form: FormControl) {
    this.classificationsService.update(this.classification)
    .then(classification  => {
      this.classification = classification;
      this.toasty.success('Classificação alterada com sucesso"');
      this.router.navigate(['/Classifications']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  new(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.classification = new Classification();
    }.bind(this), 1);

    this.router.navigate(['/Classifications/new']);
  }

 receiverFeedback(eggBaseResponse) {

    this.eggBases.push(eggBaseResponse);
    this.eggBase = eggBaseResponse;
    this.showEggBaseForm = false;
    this.buttonName = 'Trocar';
    this.icon = 'pi pi-refresh';
}

}


// const classificationAux = new Classification();

    // for (const iterator of this.products) {
    //   classificationAux.product = this.products[iterator];
    //   classificationAux.quantity = 0;
    //   this.classifications.push(classificationAux);

    // }



    // for (let index = 0; index < this.loadProducts.length; index++) {
    //   classificationAux.product = this.products[index];
    //   classificationAux.quantity = 0;
    //   this.classifications.push(classificationAux);
    // }
    // console.log(this.classifications);



     // create(form: FormControl)  {

  //   const classificationCreated = new Classification();
  //   for (let index = 1; index < this.quantity.length; index++) {

  //     classificationCreated.eggBase = this.classification.eggBase;
  //     classificationCreated.quantity = this.quantity[index];
  //     classificationCreated.product = this.products[index - 1];

  //     console.log(classificationCreated);

  //     this.classificationsService.create(classificationCreated)
  //     .then(() => {
  //       this.success = true;
  //     })
  //     .catch(error => {
  //       this.error = error;
  //       this.success = false;
  //     });
  //   }

  //   if (this.success) {
  //     this.toasty.success('Classificação adicionada com sucesso');
  //     this.router.navigate(['/Classifications']);
  //   } else {
  //     this.errorHandler.handle(this.error);
  //   }

  //   }

  // create(form: FormControl)  {
  //   this.classificationsService.create(this.classification)

  //   .then(() => {
  //     this.toasty.success('Classificação adicionada com sucesso');
  //     this.router.navigate(['/Classifications']);
  //   })
  //   .catch(error => this.errorHandler.handle(error));
  // }
