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
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';

import {MenubarModule} from 'primeng/menubar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import {PanelMenuModule} from 'primeng/panelmenu';


@NgModule({
  declarations: [NavbarComponent, NotFoundPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    ConfirmDialogModule,
    MatSidenavModule,
    MatListModule,
    MenubarModule,
    MatToolbarModule,
    MatIconModule,
    PanelMenuModule,
    ToastyModule.forRoot()
  ],
  exports: [NavbarComponent,
    ToastyModule,
    ConfirmDialogModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    PanelMenuModule],
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
