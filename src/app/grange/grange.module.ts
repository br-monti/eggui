
import { SharedModule } from './../shared/shared.module';


import { RouterModule } from '@angular/router';
import { ChickenLineagesListComponent } from './chicken-lineages-list/chicken-lineages-list.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ChickenLineagesEditComponent } from './chicken-lineages-edit/chicken-lineages-edit.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ShedsListComponent } from './sheds-list/sheds-list.component';
import { ShedsEditComponent } from './sheds-edit/sheds-edit.component';
import { ChickenLotsListComponent } from './chicken-lots-list/chicken-lots-list.component';
import { ChickenLotsEditComponent } from './chicken-lots-edit/chicken-lots-edit.component';
import { CreationMonitoringsListComponent } from './creation-monitorings-list/creation-monitorings-list.component';
import { CreationMonitoringsEditComponent } from './creation-monitorings-edit/creation-monitorings-edit.component';



@NgModule({
  declarations: [ChickenLineagesListComponent,
    ChickenLineagesEditComponent,
    ShedsListComponent,
    ShedsEditComponent,
    ChickenLotsListComponent,
    ChickenLotsEditComponent,
    CreationMonitoringsListComponent,
    CreationMonitoringsEditComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    SelectButtonModule,
    RouterModule,
    SharedModule,
    DropdownModule,
    CalendarModule

  ],
  exports:  []
})
export class GrangeModule { }
