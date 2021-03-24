import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DasboardRoutes } from './dashboard.routes';

const routes: Routes = [
  { 
    path: '',
    component: DashboardComponent,
    children: DasboardRoutes,
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule] 
})
export class DasboardRoutesModule { }
