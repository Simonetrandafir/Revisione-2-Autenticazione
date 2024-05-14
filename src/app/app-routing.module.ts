import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', loadChildren: () => import('./_pagine/index/index.module').then((m) => m.IndexModule), outlet: 'index' },
	{ path: '', loadChildren: () => import('./_pagine/home/home.module').then((m) => m.HomeModule), outlet: 'primary' },
	{ path: 'index', loadChildren: () => import('./_pagine/index/index.module').then((m) => m.IndexModule), outlet: 'index' },
	{ path: 'home', loadChildren: () => import('./_pagine/home/home.module').then((m) => m.HomeModule), outlet: 'primary' },
	{ path: 'dashboard', loadChildren: () => import('./_pagine/dashboard/dashboard.module').then((m) => m.DashboardModule), outlet: 'primary' },
	{ path: 'impostazioni', loadChildren: () => import('./_pagine/impostazioni/impostazioni.module').then((m) => m.ImpostazioniModule), outlet: 'primary' },
	{ path: 'film', loadChildren: () => import('./_pagine/film/film.module').then((m) => m.FilmModule), outlet: 'primary' },
	{ path: 'serie-tv', loadChildren: () => import('./_pagine/serie-tv/serie-tv.module').then((m) => m.SerieTvModule), outlet: 'primary' },
	{ path: 'profilo', loadChildren: () => import('./_pagine/profilo/profilo.module').then((m) => m.ProfiloModule), outlet: 'primary' },
	{ path: 'nuovi', loadChildren: () => import('./_pagine/nuovi/nuovi.module').then((m) => m.NuoviModule), outlet: 'primary' },
	{ path: 'generi', loadChildren: () => import('./_pagine/generi/generi.module').then((m) => m.GeneriModule), outlet: 'primary' },
	{ path: '**', loadChildren: () => import('./_pagine/not-found/not-found.module').then((m) => m.NotFoundModule), outlet: 'primary' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
