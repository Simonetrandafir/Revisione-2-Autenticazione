import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { AuthType } from 'src/app/type/auth.type';

@Component({
	selector: 'app-nav-user',
	templateUrl: './nav-user.component.html',
	styleUrls: ['./nav-user.component.scss'],
})
export class NavUserComponent {
	switchModalParent: boolean = false;
	auth: BehaviorSubject<AuthType>;

	constructor(private ObsTokenJwt: ObsTokenJwt) {
		this.auth = this.ObsTokenJwt.leggiObsAutorizza();
	}

	riceviSwitchModal(data: boolean) {
		this.switchModalParent = data;
	}
}
