import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ProductsService } from './../service/products.service';
import { Product } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {

  product = new Product();

  constructor(
    private productsService: ProductsService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const productId = this.route.snapshot.params[`${'id'}`];

    if (productId) {
      this.loadProduct(productId);
    }
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

  save() {
    if (this.editing) {
      this.update();
    } else {
      this.create ();
    }
  }

  create()  {
    this.productsService.create(this.product)

    .then(() => {
      this.toasty.success('Produto adicionado com sucesso');

      this.router.navigate(['/Products']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  update() {
    this.productsService.update(this.product)
    .then(product  => {
      this.product = product;
      this.toasty.success('Produto alterado com sucesso"');
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

}
