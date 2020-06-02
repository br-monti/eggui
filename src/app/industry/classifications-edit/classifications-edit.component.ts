import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ClassificationsService } from './../service/classifications.service';
import { Classification, EggBase, EggType } from './../../core/model';
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
  eggBases = [];
  eggTypes = [];
  quantity = [];

  buttonName = 'Adicionar';
  icon = "pi pi-plus";

  constructor(
    private classificationsService: ClassificationsService,
    private eggTypesService: EggTypesService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const classificationId = this.route.snapshot.params[`${'id'}`];

    if (classificationId) {      
      this.loadClassification(classificationId);
    }

    this.loadEggTypes();
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

  loadEggTypes() {
    this.eggTypes = new Array<EggType>();

    return this.eggTypesService.listAll()
      .then(eggTypes => {
        this.eggTypes = eggTypes
        
          // .map(c => {
          //   return ({ label: c.type, value: c.id});
          // });

          //console.log(this.eggTypes);
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

    
    const classificationCreated = new Classification();
    

    for (let index = 1; index < this.quantity.length; index++)
    
    {
      classificationCreated.eggBase = this.classification.eggBase;
      classificationCreated.quantity = this.quantity[index];
      classificationCreated.eggType = this.eggTypes[index - 1];

      console.log(classificationCreated.eggBase);

      this.classificationsService.create(classificationCreated)
      .then(() => {
        setTimeout(function() {
          this.classification = new Classification();
        }.bind(this), 1);
        this.toasty.success('Classificação adicionada com sucesso');  
        this.router.navigate(['/Classifications']);
      })
      .catch(error => this.errorHandler.handle(error));
    }
      
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
