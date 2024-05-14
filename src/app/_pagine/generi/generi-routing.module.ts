import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneriComponent } from './generi.component';

const routes: Routes = [{ path: '', component: GeneriComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneriRoutingModule { }
