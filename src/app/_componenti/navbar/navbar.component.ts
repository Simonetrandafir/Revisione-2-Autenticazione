import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { AuthType } from 'src/app/type/auth.type';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
	switchModalParent: boolean = false;
	auth: BehaviorSubject<AuthType>;

	constructor(private ObsTokenJwt: ObsTokenJwt) {
		this.auth = this.ObsTokenJwt.leggiObsAutorizza();
	}

	riceviSwitchModal(data: boolean) {
		this.switchModalParent = data;
	}
}
