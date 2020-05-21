import { Component, OnInit } from '@angular/core';
import { EggBase, EggLot } from 'src/app/core/model';
import { EggBasesService } from '../service/egg-bases.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { EggLotsService } from '../service/egg-lots.service';
import * as moment from 'moment';

@Component({
  selector: 'app-egg-bases-edit',
  templateUrl: './egg-bases-edit.component.html',
  styleUrls: ['./egg-bases-edit.component.css']
})
export class EggBasesEditComponent implements OnInit {

  eggBase = new EggBase();
  eggLots = [];

  box = 0;
  card = 0;
  egg = 0 ;

  constructor(
    private eggBasesService: EggBasesService,
    private eggLotsService: EggLotsService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const eggBaseId = this.route.snapshot.params[`${'id'}`];

    if (eggBaseId) {
      this.loadEggBase(eggBaseId);
    }
    this.loadEggLots();
  }

  onSelected() {
    let validityDate = moment(

      this.eggBase.productionDate
  ).add(
      28, 'd'
  );

    if (validityDate === undefined) {
    validityDate = null;
      } else {
    this.eggBase.validityDate = validityDate.toDate();
  }

  }

  get editing() {
    return Boolean(this.eggBase.id);
  }

  loadEggBase(id: number) {
    this.eggBasesService.findById(id)
    .then (eggBase => {
      this.box = Math.trunc(eggBase.quantity / 360);
      const boxDecimal = (eggBase.quantity / 360) - (this.box);
      this.card = Math.trunc(boxDecimal * 12);
      this.egg  = Math.trunc(this.card);
      this.eggBase = eggBase;

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
    this.eggBase.quantity = ((this.box * 360) + (this.card * 30) +  (this.egg * 1)) ;
    this.eggBasesService.create(this.eggBase)

    .then(() => {
      this.toasty.success('Matéria Prima adicionada com sucesso');

      this.router.navigate(['/EggBases']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  update() {

    this.eggBase.quantity = (this.box * 360) + (this.card * 30) + this.egg ;
    this.eggBasesService.update(this.eggBase)
    .then(eggBase  => {
      this.eggBase = eggBase;
      this.toasty.success('Matéria Prima alterada com sucesso"');
      this.router.navigate(['/EggBases']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  loadEggLots() {
    return this.eggLotsService.listAll()
      .then(eggLots => {
        this.eggLots = eggLots
          .map(c => ({ label: c.name, value: c.id }));
      })
      .catch(error => this.errorHandler.handle(error));
  }


  new(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.eggLot = new EggLot();
    }.bind(this), 1);

    this.router.navigate(['/EggBases/new']);
  }
}
