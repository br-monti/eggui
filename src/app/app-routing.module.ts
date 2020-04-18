import { ChickenLineagesEditComponent } from './grange/chicken-lineages-edit/chicken-lineages-edit.component';
import { ChickenLineagesListComponent } from './grange/chicken-lineages-list/chicken-lineages-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'ChickenLineages', component: ChickenLineagesListComponent },
  { path: 'ChickenLineages/new', component: ChickenLineagesEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
