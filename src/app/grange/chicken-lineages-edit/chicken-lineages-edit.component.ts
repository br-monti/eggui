import { ToastyService } from 'ng2-toasty';
import { FormControl } from '@angular/forms';
import { ChickenLineage } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { ChickenLineagesService } from '../chicken-lineages.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chicken-lineages-edit',
  templateUrl: './chicken-lineages-edit.component.html',
  styleUrls: ['./chicken-lineages-edit.component.css']
})
export class ChickenLineagesEditComponent implements OnInit {

  chickenColors = [
    { label: 'Branca', value: 'Branca' },
    { label: 'Vermelha', value: 'Vermelha' },
  ];

  chickenLineage = new ChickenLineage();

  constructor(
    private chickenLineageService: ChickenLineagesService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    const chickenLineageId = this.route.snapshot.params[`${'id'}`];

    if (chickenLineageId) {
      this.loadChickenLineage(chickenLineageId);
    }
  }

  get editing() {
    return Boolean(this.chickenLineage.id);
  }

  loadChickenLineage(id: number) {
    this.chickenLineageService.findById(id)
    .then (chickenLineage => {
      this.chickenLineage = chickenLineage;
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
    this.chickenLineageService.create(this.chickenLineage)

    .then(() => {
      this.toasty.success('Linhagem adicionanda com sucesso');

      this.router.navigate(['/ChickenLineages']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  update(form: FormControl) {
    this.chickenLineageService.update(this.chickenLineage)
    .then(chickenLineage  => {
      this.chickenLineage = chickenLineage;
      this.toasty.success('Linhagem alterada com sucesso"');
      this.router.navigate(['/ChickenLineages']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  new(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.chickenLineage = new ChickenLineage();
    }.bind(this), 1);

    this.router.navigate(['/ChickenLineages']);
  }

}
