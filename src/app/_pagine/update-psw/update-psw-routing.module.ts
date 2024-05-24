import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatePswComponent } from './update-psw.component';

const routes: Routes = [{ path: '', component: UpdatePswComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatePswRoutingModule { }
