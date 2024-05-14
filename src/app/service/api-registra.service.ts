import { Injectable } from '@angular/core';
import { ChiamataApiService } from './chiamata-api.service';

@Injectable({
	providedIn: 'root',
})
export class ApiRegistraService {
	constructor(private api: ChiamataApiService) {}
}
