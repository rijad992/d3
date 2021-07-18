import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeethreedzejesComponent } from './deethreedzejes/deethreedzejes.component';

const routes: Routes = [
  {
    path: 'deethreedzejes',
    component: DeethreedzejesComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
