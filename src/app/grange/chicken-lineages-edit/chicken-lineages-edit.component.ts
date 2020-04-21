import { ToastyService } from 'ng2-toasty';
import { FormControl } from '@angular/forms';
import { ChickenLineage } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { ChickenLineagesService } from '../chicken-lineages.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chicken-lineages-edit',
  templateUrl: './chicken-lineages-edit.component.html',
  styleUrls: ['./chicken-lineages-edit.component.css']
})
export class ChickenLineagesEditComponent implements OnInit {

  chickenColors = [
    { label: 'Branco', value: 'BRANCO' },
    { label: 'Vermelho', value: 'VERMELHO' },
  ];

  chickenLineage = new ChickenLineage();

  constructor(
    private chickenLineageService: ChickenLineagesService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute) { }

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

  create(form: FormControl)  {
    console.log(this.chickenLineage);
    this.chickenLineageService.create(this.chickenLineage)

    .then(() => {
      this.toasty.success('Linhagem adicionanda com sucesso');
      form.reset();
      this.chickenLineage = new ChickenLineage();
    })
    .catch(error => this.errorHandler.handle(error));
  }

}
