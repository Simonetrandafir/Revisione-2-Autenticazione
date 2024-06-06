import { Injectable } from '@angular/core';
import { sha512 } from 'js-sha512';
import { jwtDecode } from 'jwt-decode';
import { Generi } from '../interface/generi.interface';
import { ComuniItaliani } from '../interface/comuni.interface';
import { Nazioni } from '../interface/nazioni.interface';
import { TipoIndirizzi } from '../interface/tipo-indirizzo.interface';
import { TipoRecapito } from '../interface/tipo-recapito.interface';
import { Province } from '../interface/province.interface';

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

	/**
	 * Rimuove dal sessioneStorage e localStorage il tokenCodex
	 */
	static logOut(): void {
		sessionStorage.removeItem('tokenCodex');
		localStorage.removeItem('tokenCodex');
	}

	static showHidePsw(idElement: string): void {
		const pswInput: HTMLInputElement = document.getElementById(idElement) as HTMLInputElement;
		if (pswInput.type === 'password') {
			pswInput.type = 'text';
		} else {
			pswInput.type = 'password';
		}
	}

	/** Controlla la robustezza di una password ritornando un numero su una scala da 0 a 100
	 *
	 * @param password: string
	 * @returns numero da 0 a 100: number
	 */
	static checkPswForza(psw: string): { percentuale: number; validita: boolean } {
		let x = 0;

		const regex: RegExp = /^[a-zA-Z\d$%&_.!?-]+$/;

		const controlloPsw: RegExp[] = [/^.{8,20}$/, /[0-9]/, /[a-z]/, /[A-Z]/, /[$%&_.!?-]/];

		const nControlli: number = controlloPsw.length;
		let incremento: number = 100 / nControlli;

		const password = psw.trim();

		// Verifica se la password contiene spazi
		let controllo = /\s\S/;

		// Calcola la robustezza della password in base ai criteri
		if (!regex.test(password)) {
			x = 0;
		} else if (controllo.test(password)) {
			x = 0;
		} else {
			for (let i: number = 0; i < nControlli; i++) {
				controllo = controlloPsw[i];
				if (controllo.test(password)) {
					x = x + incremento;
				}
			}
		}
		const validita: boolean = x > 40;

		return { percentuale: x, validita };
	}

	static calculateCrackTime(password: string): string {
		const attemptsPerSecond = 1e9; // 1 miliardo di tentativi al secondo
		const regex: RegExp = /^[a-zA-Z\d$%&_.!?-]+$/;

		// Verifica se la password corrisponde al pattern specificato
		if (password === '') {
			return '0 secondi';
		} else if (!regex.test(password)) {
			return '0 secondi';
		}

		// Calcolo il numero di combinazioni possibili
		const charsetSize = this.getCharsetSize(password);
		const totalCombinations = Math.pow(charsetSize, password.length);

		// Calcolo del tempo necessario in secondi
		const secondsToCrack = totalCombinations / attemptsPerSecond;

		// Conversione in unità di tempo maggiore
		const secondsInMinute = 60;
		const secondsInHour = secondsInMinute * 60;
		const secondsInDay = secondsInHour * 24;
		const secondsInMonth = secondsInDay * 30;
		const secondsInYear = secondsInDay * 365;

		let timeToCrack: number;
		let unit: string;

		if (secondsToCrack < secondsInMinute) {
			timeToCrack = Math.ceil(secondsToCrack);
			unit = 'secondi';
		} else if (secondsToCrack < secondsInHour) {
			timeToCrack = Math.ceil(secondsToCrack / secondsInMinute);
			unit = 'minuti';
		} else if (secondsToCrack < secondsInDay) {
			timeToCrack = Math.ceil(secondsToCrack / secondsInHour);
			unit = 'ore';
		} else if (secondsToCrack < secondsInMonth) {
			timeToCrack = Math.ceil(secondsToCrack / secondsInDay);
			unit = 'giorni';
		} else if (secondsToCrack < secondsInYear) {
			timeToCrack = Math.ceil(secondsToCrack / secondsInMonth);
			unit = 'mesi';
		} else {
			timeToCrack = Math.ceil(secondsToCrack / secondsInYear);
			unit = 'anni';
		}

		return `${timeToCrack} ${unit}`;
	}

	static getCharsetSize(password: string): number {
		let charsetSize = 0;
		const hasLowerCase = /[a-z]/.test(password);
		const hasUpperCase = /[A-Z]/.test(password);
		const hasNumbers = /\d/.test(password);
		const hasSymbols = /[$%&_.!?-]/.test(password);

		if (hasLowerCase) charsetSize += 26;
		if (hasUpperCase) charsetSize += 26;
		if (hasNumbers) charsetSize += 10;
		if (hasSymbols) charsetSize += 8; // Numero di simboli specificati nella regex

		return charsetSize;
	}
	//-----------------------------------------------------------------
	static setComuniLocalStorage(comuni: ComuniItaliani[]) {
		const tmp: string = JSON.stringify(comuni);
		return localStorage.setItem('comuniItalia', tmp);
	}
	static setNazioniLocalStorage(nazioni: Nazioni[]) {
		const tmp: string = JSON.stringify(nazioni);
		return localStorage.setItem('nazioni', tmp);
	}
	static setProvinceLocalStorage(province: Province[]) {
		const tmp: string = JSON.stringify(province);
		return localStorage.setItem('provinceItalia', tmp);
	}
	static setTipoIndirizziLocalStorage(tipoIndirizzi: TipoIndirizzi[]) {
		const tmp: string = JSON.stringify(tipoIndirizzi);
		return localStorage.setItem('tipoIndirizzi', tmp);
	}
	static setTipoRecapitiLocalStorage(tipoRecapiti: TipoRecapito[]) {
		const tmp: string = JSON.stringify(tipoRecapiti);
		return localStorage.setItem('tipoRecapiti', tmp);
	}
	static isLocalStorageKey(chiave: string): boolean {
		const oggetto = localStorage.getItem(chiave);
		if (oggetto) {
			return true;
		} else {
			return false;
		}
	}
	static getLocalStorageObj(chiave: string): any[] {
		const tmp = localStorage.getItem(chiave);
		if (tmp && tmp !== null) {
			return JSON.parse(tmp);
		} else {
			return [];
		}
	}
	static capitalizza(stringa: string) {
		if (typeof stringa !== 'string') return 'Error';
		return stringa.charAt(0).toUpperCase() + stringa.slice(1).toLowerCase();
	}
}
