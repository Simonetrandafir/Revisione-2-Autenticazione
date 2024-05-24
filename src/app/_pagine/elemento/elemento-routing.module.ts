import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementoComponent } from './elemento.component';

const routes: Routes = [{ path: '', component: ElementoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElementoRoutingModule { }
