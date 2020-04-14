import { ChickenLineagesService } from '../chicken-lineages.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chicken-lineages-list',
  templateUrl: './chicken-lineages-list.component.html',
  styleUrls: ['./chicken-lineages-list.component.css']
})
export class ChickenLineagesListComponent implements OnInit {

  chickenLineages = [];

    constructor(private chickenLineagesService: ChickenLineagesService) { }

  ngOnInit() {
    this.list();
  }

    list() {
      this.chickenLineagesService.list()
      .then(chickenLineages => this.chickenLineages = chickenLineages);
    }



}
