import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { EggLot, ChickenLot } from 'src/app/core/model';
import { Component, OnInit } from '@angular/core';
import { EggLotsService } from '../service/egg-lots.service';

@Component({
  selector: 'app-egg-lots-edit',
  templateUrl: './egg-lots-edit.component.html',
  styleUrls: ['./egg-lots-edit.component.css']
})
export class EggLotsEditComponent implements OnInit {

  eggLot = new EggLot();
  showChickenLotForm = false;
  chickenLot: ChickenLot;

  constructor(
    private eggLotsService: EggLotsService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    //this.eggLot.chickenColor = 'Branca';
    const eggLotId = this.route.snapshot.params[`${'id'}`];

    if (eggLotId) {
      this.loadEggLot(eggLotId);
    }
  }

  prepareNewChickenLot() {
    this.showChickenLotForm = true;
    this.chickenLot = new ChickenLot();
  }

  get editing() {
    return Boolean(this.eggLot.id);
  }

  loadEggLot(id: number) {
    this.eggLotsService.findById(id)
    .then (eggLot => {
      this.eggLot = eggLot;
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
    this.eggLotsService.create(this.eggLot)

    .then(() => {
      this.toasty.success('Lote de Ovos adicionado com sucesso');

      this.router.navigate(['/EggLots']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  update(form: FormControl) {
    this.eggLotsService.update(this.eggLot)
    .then(eggLot  => {
      this.eggLot = eggLot;
      this.toasty.success('Lote de Ovos alterado com sucesso"');
      this.router.navigate(['/EggLots']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  new(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.eggLot = new EggLot();
    }.bind(this), 1);

    this.router.navigate(['/EggLots/new']);
  }

  receiverFeedback(responseChickenLot) {

    console.log(responseChickenLot);
    this.eggLot.chickenLots.push(responseChickenLot);
    this.showChickenLotForm = false;
  }

}
