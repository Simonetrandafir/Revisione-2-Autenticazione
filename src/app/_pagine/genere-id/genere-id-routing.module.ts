import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenereIdComponent } from './genere-id.component';

const routes: Routes = [{ path: '', component: GenereIdComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenereIdRoutingModule { }
