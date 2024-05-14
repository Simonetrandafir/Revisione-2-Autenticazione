export interface Indirizzo {
	idIndirizzo: number;
	idTipoIndirizzo: number;
	idContatto: number;
	idNazione: number;
	idComuneItalia: number;
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
