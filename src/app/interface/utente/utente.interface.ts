export interface Utente {
	idContatto: number;
	idStato: number;
	nome: string;
	cognome: string;
	sesso: number | null;
	codFiscale: string | null;
	partitaIva: string | null;
	cittadinanza: string | null;
	idNazione: number | null;
	cittaNascita: string | null;
	provinciaNascita: string | null;
	dataNascita: Date;
}
