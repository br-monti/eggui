import { ChickenLineagesService } from './../grange/chicken-lineages.service';
import { ConfirmationService } from 'primeng/api';
import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ErrorHandlerService } from './error-handler.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule
  ],
  exports: [NavbarComponent,
    ToastyModule,
    ConfirmDialogModule],
  providers: [
    ErrorHandlerService,
    ConfirmationService,
    ChickenLineagesService ]
})
export class CoreModule { }
