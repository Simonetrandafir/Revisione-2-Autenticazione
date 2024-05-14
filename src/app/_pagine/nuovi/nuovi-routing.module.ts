import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuoviComponent } from './nuovi.component';

const routes: Routes = [{ path: '', component: NuoviComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuoviRoutingModule { }
