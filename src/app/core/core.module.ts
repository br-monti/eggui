import { EggLotsService } from '../industry/service/egg-lots.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ErrorHandlerService } from './error-handler.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundPageComponent } from './not-found-page.component';
import { ShedService } from '../grange/service/shed.service';
import { ShedManufacturerService } from '../grange/shed-manufacturers/shed-manufacturers.service';
import { ChickenLineagesService } from '../grange/service/chicken-lineages.service';
import { ChickenLotsService } from '../grange/service/chicken-lots.service';

import {MenubarModule} from 'primeng/menubar';


@NgModule({
  declarations: [NavbarComponent, NotFoundPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    ConfirmDialogModule,
    MenubarModule,
    ToastyModule.forRoot()
  ],
  exports: [NavbarComponent,
    ToastyModule,
    ConfirmDialogModule],
  providers: [
    ErrorHandlerService,
    ConfirmationService,
    ChickenLineagesService,
    ShedService,
    ShedManufacturerService,
    ChickenLotsService,
    EggLotsService]
})
export class CoreModule { }
