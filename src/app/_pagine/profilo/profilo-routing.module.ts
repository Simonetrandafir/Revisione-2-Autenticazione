import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfiloComponent } from './profilo.component';

const routes: Routes = [
	{ path: '', component: ProfiloComponent },
	{ path: 'set-crediti', loadChildren: () => import('../set-crediti/set-crediti.module').then((m) => m.SetCreditiModule), outlet: 'primary' },
	{ path: 'update-psw', loadChildren: () => import('../update-psw/update-psw.module').then(m => m.UpdatePswModule) },
	{ path: 'info', loadChildren: () => import('../info/info.module').then(m => m.InfoModule) },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProfiloRoutingModule {}
