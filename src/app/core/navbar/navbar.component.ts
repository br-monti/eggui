import { MenuItem } from 'primeng/api';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  items: MenuItem[];

  ngOnInit() {

    exibindoMenu: Boolean;

    this.items = [
      { label: 'Dashboard', routerLink: '/Dashboard'},
      {
          label: 'Granja',
          items: [
              {label: 'Linhagem', routerLink: '/ChickenLineages'},
              {label: 'Galpão', routerLink: '/Sheds'},
              {label: 'Lote de Aves', routerLink: '/ChickenLots'},
              {label: 'Crescimento', routerLink: '/CreationMonitorings'},
              {label: 'Produção', routerLink: '/ProductionMonitorings'}
          ]
      },
      {
          label: 'Entreposto',
          items: [
            {label: 'Lote de Ovos', routerLink: '/EggLots'},
            {label: 'Recepção', routerLink: '/EggBases'},
            {label: 'Classificação', routerLink: '/Classifications'},
            {label: 'Produtos', routerLink: '/Products'},
            {label: 'Embalagens', routerLink: '/Packings'}
          ]
      }
  ];
}
}
