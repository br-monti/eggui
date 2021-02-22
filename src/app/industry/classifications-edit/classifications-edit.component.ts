import { EggTypesService } from './../service/egg-types.service';
import { EggBasesService } from './../service/egg-bases.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ClassificationsService } from './../service/classifications.service';
import { Classification, EggBase, EggType } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classifications-edit',
  templateUrl: './classifications-edit.component.html',
  styleUrls: ['./classifications-edit.component.css']
})
export class ClassificationsEditComponent implements OnInit {

  classification = new Classification();
  eggBase: EggBase;
  eggBases = [];
  eggTypes = [];

  constructor(
    private classificationsService: ClassificationsService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private eggBasesService: EggBasesService,
    private eggTypesService: EggTypesService) { }

  ngOnInit() {
    const eggBaseId = this.route.snapshot.params[`${'id'}`];

    if (eggBaseId) {
      this.eggBase = new EggBase();
      this.loadEggBase(eggBaseId);
    }

    this.loadEggTypes();
    console.log(this.eggTypes);

  }

  get editing() {
    return Boolean(this.eggBase.id);
  }

  loadEggBase(id: number) {
    this.eggBasesService.findById(id)
      .then(eggBase => {
        this.eggBase = eggBase;
        this.eggBases.push(eggBase);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  loadEggTypes() {
    return this.eggTypesService.listAll()
      .then(eggTypes => {
        this.eggTypes = eggTypes;
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
