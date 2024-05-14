import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { AuthType } from 'src/app/type/auth.type';

@Component({
	selector: 'app-serie-tv',
	templateUrl: './serie-tv.component.html',
	styleUrls: ['./serie-tv.component.scss'],
})
export class SerieTvComponent implements AfterViewInit {
	auth$: BehaviorSubject<AuthType>;

	constructor(private ObsTokenJwt: ObsTokenJwt, private router: Router) {
		this.auth$ = this.ObsTokenJwt.leggiObsAutorizza();
	}
	ngAfterViewInit(): void {
		this.auth$.subscribe((auth: AuthType) => {
			if (auth.token === null) {
				this.router.navigate(['/index']);
				window.location.reload();
			}
		});
	}
}
