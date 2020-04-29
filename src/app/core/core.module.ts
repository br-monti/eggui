import { ChickenLotsService } from './../grange/chicken-lots.service';
import { AppRoutingModule } from './../app-routing.module';
import { ChickenLineagesService } from './../grange/chicken-lineages.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ErrorHandlerService } from './error-handler.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundPageComponent } from './not-found-page.component';
import { ShedService } from '../grange/shed.service';
import { ShedManufacturerService } from '../grange/shed-manufacturers/shed-manufacturers.service';
import { MatButtonModule, MatToolbarModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule } from '@angular/material';
import {SlideMenuModule} from 'primeng/slidemenu';


@NgModule({
  declarations: [NavbarComponent, NotFoundPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    SlideMenuModule,

  ],
  exports: [NavbarComponent,
    ToastyModule,
    ConfirmDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule],
  providers: [
    ErrorHandlerService,
    ConfirmationService,
    ChickenLineagesService,
    ShedService,
    ShedManufacturerService,
    ChickenLotsService ]
})
export class CoreModule { }
