export interface Indirizzo {
	idIndirizzo: number;
	idTipoIndirizzo: number;
	tipoIndirizzo?: string;
	idContatto: number;
	idNazione: number;
	nazione?: string;
	idComuneItalia: number;
	comune?: string;
	provincia?: string;
	preferito: string;
	cap: number;
	indirizzo: string;
	civico: string;
	citta: string;
	lat?: number;
	lng?: number;
	altro_1?: string;
	altro_2?: string;
}
