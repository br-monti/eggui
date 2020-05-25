import { GrangeModule } from './../grange/grange.module';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { EggLotsEditComponent } from './egg-lots-edit/egg-lots-edit.component';
import { EggLotsListComponent } from './egg-lots-list/egg-lots-list.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EggBasesEditComponent } from './egg-bases-edit/egg-bases-edit.component';
import { EggBasesListComponent } from './egg-bases-list/egg-bases-list.component';
import { ClassificationsListComponent } from './classifications-list/classifications-list.component';
import { ClassificationsEditComponent } from './classifications-edit/classifications-edit.component';



@NgModule({
  declarations: [EggLotsListComponent, 
    EggLotsEditComponent, 
    EggBasesEditComponent, 
    EggBasesListComponent,
     ClassificationsListComponent, 
     ClassificationsEditComponent],
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
    CalendarModule,
    PanelModule,
    DialogModule,
    GrangeModule
  ]
})
export class IndustryModule { }
