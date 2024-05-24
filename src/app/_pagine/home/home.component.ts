import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Film, SerieTv } from 'src/app/interface/utente/streaming.interface';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { AuthType } from 'src/app/type/auth.type';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
	dataElementi: Film[] | SerieTv[] = [];
	dataFilm: Film[] = [];
	dataSerie: SerieTv[] = [];

	auth$: BehaviorSubject<AuthType>;

	constructor(private ObsTokenJwt: ObsTokenJwt, private router: Router) {
		this.auth$ = this.ObsTokenJwt.leggiObsAutorizza();
	}
	ngAfterViewInit(): void {
		this.auth$.subscribe((auth: AuthType) => {
			if (auth.token === null) {
				window.location.reload();
			} else if (auth.token !== null) {
				this.router.navigate(['/home']);
			}
		});
	}
}
