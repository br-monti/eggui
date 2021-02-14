import { EggBasesService } from './../service/egg-bases.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ClassificationsService } from './../service/classifications.service';
import { Classification, EggBase} from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { EggTypesService } from '../service/egg-types.service';

@Component({
  selector: 'app-classifications-edit',
  templateUrl: './classifications-edit.component.html',
  styleUrls: ['./classifications-edit.component.css']
})
export class ClassificationsEditComponent implements OnInit {

  classification = new Classification();
  showEggBaseForm = false;
  eggBase: EggBase;
  classifications: Classification[];
  eggBases = [];
  eggTypes = [];
  products = [];
  quantitys = [];
  remaining: number;

  constructor(
    private classificationsService: ClassificationsService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private eggBasesService: EggBasesService) { }

  ngOnInit() {
    const eggBaseId = this.route.snapshot.params[`${'id'}`];

    if (eggBaseId) {
      this.eggBase = new EggBase();
      this.loadEggBase(eggBaseId);
    }
  }

  onChange($event, ri) {
    console.log($event.target.value);
    this.quantitys[ri] = $event.target.value;

    this.quantitys.forEach(quantity => {
      this.remaining = this.eggBase.quantity - quantity
    });

}

  get editing() {
    return Boolean(this.eggBase.id);
  }

  loadEggBase(id: number) {

    this.eggBasesService.findById(id)
    .then (eggBase => {
      this.eggBase = eggBase;
      this.classifications = this.eggBase.classifications;
      this.eggBases.push(eggBase);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  save(form: FormControl) {
    if (this.editing) {
      this.create(form);
    } else {
      this.create (form);
    }
  }

  create(form: FormControl)  {

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


}
