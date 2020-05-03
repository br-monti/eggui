import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { CreationMonitoring } from 'src/app/core/model';
import { CreationMonitoringsService } from '../service/creation-monitorings.service';
import { ChickenLotsService } from '../service/chicken-lots.service';

@Component({
  selector: 'app-creation-monitorings-edit',
  templateUrl: './creation-monitorings-edit.component.html',
  styleUrls: ['./creation-monitorings-edit.component.css']
})
export class CreationMonitoringsEditComponent implements OnInit {

  creationMonitoring = new CreationMonitoring();

  chickenLots = [];

  constructor(
    private creationMonitoringsService: CreationMonitoringsService,
    private chickenLotsService: ChickenLotsService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const creationMonitoringId = this.route.snapshot.params[`${'id'}`];

    if (creationMonitoringId) {
      this.loadCreationMonitoring(creationMonitoringId);
    }

    this.loadChickenLots();
  }

  get editing() {
    return Boolean(this.creationMonitoring.id);
  }

  loadCreationMonitoring(id: number) {
    this.creationMonitoringsService.findById(id)
    .then (creationMonitoring => {
      this.creationMonitoring = creationMonitoring;

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
    this.creationMonitoringsService.create(this.creationMonitoring)

    .then(() => {
      this.toasty.success('Lote adicionado com sucesso');

      this.router.navigate(['/CreationMonitorings']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  update(form: FormControl) {
    this.creationMonitoringsService.update(this.creationMonitoring)
    .then(creationMonitoring  => {
      this.creationMonitoring = creationMonitoring;
      this.toasty.success('Lote alterado com sucesso"');
      this.router.navigate(['/CreationMonitorings']);
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
      this.creationMonitoring = new CreationMonitoring();
    }.bind(this), 1);

    this.router.navigate(['/CreationMonitorings/new']);
  }

}
