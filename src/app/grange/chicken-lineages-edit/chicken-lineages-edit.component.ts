import { ToastyService } from 'ng2-toasty';
import { FormControl } from '@angular/forms';
import { ChickenLineage } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { ChickenLineagesService } from '../chicken-lineages.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

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
    private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
  }

  create(form: FormControl)  {
    this.chickenLineageService.create(this.chickenLineage)
    .then(() => {
      this.toasty.success('Linhagem adcionanda com sucesso');
      form.reset();
      this.chickenLineage = new ChickenLineage();
    })
    .catch(error => this.errorHandler.handle(error));
  }

}
