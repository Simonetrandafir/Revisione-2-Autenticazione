import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuttiComponent } from './tutti.component';

const routes: Routes = [{ path: '', component: TuttiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TuttiRoutingModule { }
