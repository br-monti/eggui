import { EggLotsEditComponent } from './industry/egg-lots-edit/egg-lots-edit.component';
import { EggLotsListComponent } from './industry/egg-lots-list/egg-lots-list.component';
import { CreationMonitoringsEditComponent } from './grange/creation-monitorings-edit/creation-monitorings-edit.component';
import { CreationMonitoringsListComponent } from './grange/creation-monitorings-list/creation-monitorings-list.component';
import { ChickenLotsListComponent } from './grange/chicken-lots-list/chicken-lots-list.component';
import { ChickenLotsEditComponent } from './grange/chicken-lots-edit/chicken-lots-edit.component';
import { ShedsEditComponent } from './grange/sheds-edit/sheds-edit.component';
import { ShedsListComponent } from './grange/sheds-list/sheds-list.component';
import { NotFoundPageComponent } from './core/not-found-page.component';
import { ChickenLineagesEditComponent } from './grange/chicken-lineages-edit/chicken-lineages-edit.component';
import { ChickenLineagesListComponent } from './grange/chicken-lineages-list/chicken-lineages-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductionMonitoringsEditComponent } from './grange/production-monitorings-edit/production-monitorings-edit.component';
import { ProductionMonitoringsListComponent } from './grange/production-monitorings-list/production-monitorings-list.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: 'Dashboard', pathMatch: 'full' }, // Redirecionamento
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'ChickenLineages', component: ChickenLineagesListComponent },
  { path: 'ChickenLineages/new', component: ChickenLineagesEditComponent },
  { path: 'ChickenLineages/:id', component: ChickenLineagesEditComponent },
  { path: 'ChickenLots', component: ChickenLotsListComponent },
  { path: 'ChickenLots/new', component: ChickenLotsEditComponent },
  { path: 'ChickenLots/:id', component: ChickenLotsEditComponent },
  { path: 'Sheds', component: ShedsListComponent },
  { path: 'Sheds/new', component: ShedsEditComponent },
  { path: 'Sheds/:id', component: ShedsEditComponent },
  { path: 'CreationMonitorings', component: CreationMonitoringsListComponent },
  { path: 'CreationMonitorings/new', component: CreationMonitoringsEditComponent },
  { path: 'CreationMonitorings/:id', component: CreationMonitoringsEditComponent },
  { path: 'ProductionMonitorings', component: ProductionMonitoringsListComponent },
  { path: 'ProductionMonitorings/new', component: ProductionMonitoringsEditComponent },
  { path: 'ProductionMonitorings/:id', component: ProductionMonitoringsEditComponent },
  { path: 'EggLots', component: EggLotsListComponent },
  { path: 'EggLots/new', component: EggLotsEditComponent },
  { path: 'EggLots/:id', component: EggLotsEditComponent },
  { path: 'PageNotFound', component: NotFoundPageComponent },
  { path: '**', redirectTo: 'PageNotFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
