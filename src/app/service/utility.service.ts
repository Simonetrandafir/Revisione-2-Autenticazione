import { Injectable } from '@angular/core';
import { sha512 } from 'js-sha512';
import { jwtDecode } from 'jwt-decode';

@Injectable({
	providedIn: 'root',
})
export class UtilityService {
	constructor() {}
	/**
	 * Prende password e sale e richiama la libreria esterna js-sha512
	 * Ritorna l'hash della password e il sale combinati
	 *
	 * @requires js-sha512
	 * @param psw string
	 * @param sale string
	 * @returns string
	 */
	static hashPswSale(psw: string, sale: string): string {
		const pswSale: string = sale + psw;
		const hash: string = sha512(pswSale);
		return hash;
	}

	/**
	 * Decodifica il token con la libreria esterna jwt-decode
	 *
	 * @requires jwt-decode
	 * @param token string
	 * @returns Object | null
	 */
	static leggiToken(token: string): any {
		try {
			return jwtDecode(token);
		} catch (error) {
			console.error('Errore lettura token');
			return null;
		}
	}

	/**
	 * Funzione per creare l'hash di una stringa con js-sha512
	 *
	 * @requires js-sha512
	 * @param stringa string
	 * @returns string
	 */
	static hashString(stringa: string): string {
		const hash = sha512(stringa);
		return hash;
	}
}
