import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ClassificationsService } from './../service/classifications.service';
import { Classification, EggBase } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classifications-edit',
  templateUrl: './classifications-edit.component.html',
  styleUrls: ['./classifications-edit.component.css']
})
export class ClassificationsEditComponent implements OnInit {

  classification = new Classification();
  showEggBaseForm = false;
  eggBase: EggBase;
  eggBases = [];

  buttonName = 'Adicionar';
  icon = "pi pi-plus";

  constructor(
    private classificationsService: ClassificationsService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const classificationId = this.route.snapshot.params[`${'id'}`];

    if (classificationId) {
      
      this.loadClassification(classificationId);
    }
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
    this.icon = "pi pi-refresh"
    this.classificationsService.findById(id)
    .then (classification => {
      this.classification = classification;
      this.eggBases.splice(0, this.eggBases.length);
      this.eggBases.push(this.classification.eggBase);
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
    this.classificationsService.create(this.classification)

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
    this.classification.eggBase = eggBaseResponse;
    this.showEggBaseForm = false;
    this.buttonName = 'Trocar';
    this.icon = "pi pi-refresh"
}

}
