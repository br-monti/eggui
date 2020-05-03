import { FormControl } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { Shed } from '../../core/model';
import { ShedService } from '../service/shed.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShedManufacturerService } from '../shed-manufacturers/shed-manufacturers.service';

@Component({
  selector: 'app-shed-edit',
  templateUrl: './sheds-edit.component.html',
  styleUrls: ['./sheds-edit.component.css']
})
export class ShedsEditComponent implements OnInit {

  shed = new Shed();

  types = [
    { label: 'Convencional', value: 'Convencional' },
    { label: 'Automatizado', value: 'Automatizado' },
  ];

  shedManufacturers = [];

  constructor(
    private shedManufacturerService: ShedManufacturerService,
    private shedService: ShedService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.shed.type = 'Convencional';

    const shedId = this.route.snapshot.params[`${'id'}`];

    if (shedId) {
      this.loadShed(shedId);
    }

    this.loadShedManufacturers();
  }

  get editing() {
    return Boolean(this.shed.id);
  }

  loadShed(id: number) {
    this.shedService.findById(id)
    .then (shed => {
      this.shed = shed;
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
    this.shedService.create(this.shed)

    .then(() => {
      this.toasty.success('Galpão adicionado com sucesso');

      this.router.navigate(['/Sheds']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  update(form: FormControl) {
    this.shedService.update(this.shed)
    .then(shed  => {
      this.shed = shed;
      this.toasty.success('Galpão alterado com sucesso"');
      this.router.navigate(['/Sheds']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  loadShedManufacturers() {
    return this.shedManufacturerService.listAll()
      .then(shedManufacturers => {
        this.shedManufacturers = shedManufacturers
          .map(c => ({ label: c.manufacturer, value: c.id }));
      })
      .catch(error => this.errorHandler.handle(error));
  }

  new(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.shed = new Shed();
    }.bind(this), 1);

    this.router.navigate(['/Sheds/new']);
  }

}
