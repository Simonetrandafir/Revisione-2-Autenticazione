import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-btn-logout',
	templateUrl: './btn-logout.component.html',
	styleUrls: ['./btn-logout.component.scss'],
})
export class BtnLogoutComponent {
	constructor(private router: Router) {}

	logout() {
		sessionStorage.removeItem('tokenCodex');
		localStorage.removeItem('tokenCodex');

		this.router.navigateByUrl('/index');
		window.location.reload();
	}
}
