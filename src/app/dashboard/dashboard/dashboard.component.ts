import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData = {
    labels: ['1', '2', '3', '4'],
    datasets: [
      {
        data: [30, 25, 20 , 15],
        backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC']
      }
    ]
  };
  lineChartData = {
    labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    datasets: [
      {
        label: 'Lote 1',
        data: [98, 97, 98, 96, 97, 98, 96],
        borderColor: '#FF9900'
      }, {
        label: 'Lote 2',
        data: [94, 94, 93, 93, 92, 92, 93],
        borderColor: '#109618'
      }, {
        label: 'Lote 3',
        data: [88, 88, 87, 86, 88, 88, 88],
        borderColor: '#990099'
      }, {
        label: 'Lote 4',
        data: [84, 84, 84, 85, 84, 84, 85],
        borderColor: '#3B3EAC'
      }
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
