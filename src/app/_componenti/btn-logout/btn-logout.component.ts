import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
	selector: 'app-btn-logout',
	templateUrl: './btn-logout.component.html',
	styleUrls: ['./btn-logout.component.scss'],
})
export class BtnLogoutComponent {
	constructor(private router: Router, private utility: UtilityService) {}

	logout() {
		UtilityService.logOut();
		window.location.reload();
	}
}
