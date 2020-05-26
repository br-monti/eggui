import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ClassificationsService } from './../service/classifications.service';
import { Classification } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classifications-edit',
  templateUrl: './classifications-edit.component.html',
  styleUrls: ['./classifications-edit.component.css']
})
export class ClassificationsEditComponent implements OnInit {

  classification = new Classification();
  showChickenLotForm = false;
  // chickenLot: ChickenLot;

  constructor(
    private classificationsService: ClassificationsService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // this.eggLot.chickenColor = 'Branca';
    const classificationId = this.route.snapshot.params[`${'id'}`];

    if (classificationId) {
      this.loadClassification(classificationId);
    }
  }

  prepareNewChickenLot() {
    this.showChickenLotForm = true;
    // this.chickenLot = new ChickenLot();
  }

  get editing() {
    return Boolean(this.classification.id);
  }

  loadClassification(id: number) {
    this.classificationsService.findById(id)
    .then (classification => {
      this.classification = classification;
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

  // receiverFeedback(responseChickenLot) {

  //   console.log(responseChickenLot);
  //   this.eggLot.chickenLots.push(responseChickenLot);
  //   this.showChickenLotForm = false;
  // }

}
