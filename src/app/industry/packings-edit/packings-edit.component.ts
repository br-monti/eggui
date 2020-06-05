import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { PackingsService } from '../service/packings.service';
import { Packing } from '../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-packings-edit',
  templateUrl: './packings-edit.component.html',
  styleUrls: ['./packings-edit.component.css']
})
export class PackingsEditComponent implements OnInit {

  packing = new Packing();

  constructor(
    private packingsService: PackingsService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const packingId = this.route.snapshot.params[`${'id'}`];

    if (packingId) {
      this.loadPacking(packingId);
    }
  }

  get editing() {
    return Boolean(this.packing.id);
  }

  loadPacking(id: number) {
    this.packingsService.findById(id)
    .then (packing => {
      this.packing = packing;
    })
    .catch(error => this.errorHandler.handle(error));
  }

  save() {
    if (this.editing) {
      this.update();
    } else {
      this.create();
    }
  }

  create()  {
    this.packingsService.create(this.packing)

    .then(() => {
      this.toasty.success('Embalagem adicionada com sucesso');
      this.router.navigate(['/Packings']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  update() {
    this.packingsService.update(this.packing)
    .then(packing  => {
      this.packing = packing;
      this.toasty.success('Embalagem alterada com sucesso"');
      this.router.navigate(['/Packings']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  new(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.packing = new Packing();
    }.bind(this), 1);

    this.router.navigate(['/Packings/new']);
  }


}
