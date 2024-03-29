import { Component, OnInit } from '@angular/core';
import { ChickenLot } from 'src/app/core/model';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ShedService } from '../service/shed.service';
import { ChickenLotsService } from '../service/chicken-lots.service';
import { ChickenLineagesService } from '../service/chicken-lineages.service';
import { EggLotsService } from 'src/app/industry/service/egg-lots.service';

@Component({
  selector: 'app-chicken-lots-edit',
  templateUrl: './chicken-lots-edit.component.html',
  styleUrls: ['./chicken-lots-edit.component.css']
})
export class ChickenLotsEditComponent implements OnInit {


  chickenLot = new ChickenLot();

  sheds = [];
  chickenLineages = [];
  eggLots = [];
  debickings = [
    { label: 'Convencional', value: 'Convencional' },
    { label: 'Laser', value: 'Laser' },
    { label: 'V', value: 'V' }
  ];


  constructor(
    private chickenLotService: ChickenLotsService,
    private chickenLineageService: ChickenLineagesService,
    private shedService: ShedService,
    private eggLotsService: EggLotsService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // this.chickenLot.chickenColor = 'Branca';
    const chickenLotId = this.route.snapshot.params[`${'id'}`];

    if (chickenLotId) {
      this.loadChickenLot(chickenLotId);
    }

    this.loadChickenLineages();
    this.loadSheds();
    //this.loadEggLots();
  }

  get editing() {
    return Boolean(this.chickenLot.id);
  }

  loadChickenLot(id: number) {
    this.chickenLotService.findById(id)
    .then (chickenLot => {
      this.chickenLot = chickenLot;

    })
    .catch(error => this.errorHandler.handle(error));
  }

  save(form: FormControl) {
    if (this.editing) {
      this.update(form);
    } else {
      this.create(form);
    }
  }

  create(form: FormControl)  {
    this.chickenLotService.create(this.chickenLot)

    .then(() => {
      this.toasty.success('Lote adicionado com sucesso');

      this.router.navigate(['/ChickenLots']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  update(form: FormControl) {
    this.chickenLotService.update(this.chickenLot)
    .then(chickenLot  => {
      this.chickenLot = chickenLot;
      this.toasty.success('Lote alterado com sucesso"');
      this.router.navigate(['/ChickenLots']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  loadChickenLineages() {
    return this.chickenLineageService.listAll()
      .then(chickenLineages => {
        this.chickenLineages = chickenLineages
          .map(c => ({ label: c.lineage, value: c.id }));
      })
      .catch(error => this.errorHandler.handle(error));
  }

  loadSheds() {
    return this.shedService.listAll()
      .then(sheds => {
        this.sheds = sheds
          .map(c => ({label: c.name, value: c.id  }));
      })
      .catch(error => this.errorHandler.handle(error));
  }

  // loadEggLots() {
  //   return this.eggLotsService.listAll()
  //     .then(eggLots => {
  //       this.eggLots = eggLots
  //         .map(c => ({label: c.name, value: c.id  }));
  //     })
  //     .catch(error => this.errorHandler.handle(error));

  // }

  new(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.chickenLot = new ChickenLot();
    }.bind(this), 1);

    this.router.navigate(['/ChickenLots/new']);
  }
}
