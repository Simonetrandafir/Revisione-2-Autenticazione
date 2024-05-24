import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetCreditiComponent } from './set-crediti.component';

const routes: Routes = [{ path: '', component: SetCreditiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetCreditiRoutingModule { }
