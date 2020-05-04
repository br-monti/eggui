import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { SharedModule } from './../shared/shared.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,

    PanelModule,
    ChartModule,

    SharedModule
  ]
})
export class DashboardModule { }
