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



@NgModule({
  declarations: [ChickenLineagesListComponent, ChickenLineagesEditComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule
  ],
  exports:  [ChickenLineagesListComponent,
  ChickenLineagesEditComponent]
})
export class GrangeModule { }
