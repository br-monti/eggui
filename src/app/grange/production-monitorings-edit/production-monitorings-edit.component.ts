import { Component, OnInit } from '@angular/core';
import { ProductionMonitoring } from 'src/app/core/model';
import { ProductionMonitoringsService } from '../service/production-monitorings.service';
import { ChickenLotsService } from '../service/chicken-lots.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-production-monitorings-edit',
  templateUrl: './production-monitorings-edit.component.html',
  styleUrls: ['./production-monitorings-edit.component.css']
})
export class ProductionMonitoringsEditComponent implements OnInit {

  productionMonitoring = new ProductionMonitoring();

  chickenLots = [];

  constructor(
    private productionMonitoringsService: ProductionMonitoringsService,
    private chickenLotsService: ChickenLotsService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const prodcutionMonitoringId = this.route.snapshot.params[`${'id'}`];

    if (prodcutionMonitoringId) {
      this.loadProductionMonitoring(prodcutionMonitoringId);
    }

    this.loadChickenLots();
  }

  get editing() {
    return Boolean(this.productionMonitoring.id);
  }

  loadProductionMonitoring(id: number) {
    this.productionMonitoringsService.findById(id)
    .then (productionMonitoring => {
      this.productionMonitoring = productionMonitoring;

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
    this.productionMonitoringsService.create(this.productionMonitoring)

    .then(() => {
      this.toasty.success('Lote adicionado com sucesso');

      this.router.navigate(['/ProductionMonitorings']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  update(form: FormControl) {
    this.productionMonitoringsService.update(this.productionMonitoring)
    .then(productionMonitoring  => {
      this.productionMonitoring = productionMonitoring;
      this.toasty.success('Monitoramento alterado com sucesso"');
      this.router.navigate(['/ProductionMonitorings']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  loadChickenLots() {
    return this.chickenLotsService.listAll()
      .then(chickenLots => {
        this.chickenLots = chickenLots
          .map(c => ({ label: c.id, value: c.id }));
      })
      .catch(error => this.errorHandler.handle(error));
  }


  new(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.productionMonitoring = new ProductionMonitoring();
    }.bind(this), 1);

    this.router.navigate(['/ProductionMonitorings/new']);
  }

}