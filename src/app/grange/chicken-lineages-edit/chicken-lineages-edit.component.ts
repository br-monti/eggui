import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
