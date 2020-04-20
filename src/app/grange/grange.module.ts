import { SharedModule } from './../shared/shared.module';
import { MessageComponent } from '../shared/message/message.component';


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
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ChickenLineagesListComponent, ChickenLineagesEditComponent],
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
    SharedModule

  ],
  exports:  [ChickenLineagesListComponent,
  ChickenLineagesEditComponent]
})
export class GrangeModule { }
