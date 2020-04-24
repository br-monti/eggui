import { ShedsEditComponent } from './grange/sheds-edit/sheds-edit.component';
import { ShedsListComponent } from './grange/sheds-list/sheds-list.component';
import { NotFoundPageComponent } from './core/not-found-page.component';
import { ChickenLineagesEditComponent } from './grange/chicken-lineages-edit/chicken-lineages-edit.component';
import { ChickenLineagesListComponent } from './grange/chicken-lineages-list/chicken-lineages-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'ChickenLineages', pathMatch: 'full' }, // Redirecionamento
  { path: 'ChickenLineages', component: ChickenLineagesListComponent },
  { path: 'ChickenLineages/new', component: ChickenLineagesEditComponent },
  { path: 'ChickenLineages/:id', component: ChickenLineagesEditComponent },
  { path: 'Sheds', component: ShedsListComponent },
  { path: 'Sheds/new', component: ShedsEditComponent },
  { path: 'Sheds/:id', component: ShedsEditComponent },
  { path: 'PageNotFound', component: NotFoundPageComponent },
  { path: '**', redirectTo: 'PageNotFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
