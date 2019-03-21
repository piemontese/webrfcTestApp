import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebrfcPageComponent } from './components/webrfc-page/webrfc-page.component';
import { WebrfcCallPageComponent } from './components/webrfc-call-page/webrfc-call-page.component';
import { DataTablesPageComponent } from './components/data-tables-page/data-tables-page.component';
import { WebDataTablePageComponent } from './components/web-data-table-page/web-data-table-page.component';

const routes: Routes = [
  { path: '', component: WebrfcPageComponent },
  { path: 'webrfc-page', component: WebrfcPageComponent },
  { path: 'webrfc-call-page', component: WebrfcCallPageComponent },
  { path: 'data-tables-page', component: DataTablesPageComponent },
  { path: 'web-data-table-page', component: WebDataTablePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
