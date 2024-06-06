import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, switchMap } from 'rxjs';
import { Generi } from 'src/app/interface/generi.interface';
import { Film, SerieTv } from 'src/app/interface/utente/streaming.interface';
import { ApiGeneriService } from 'src/app/service/api-generi.service';

@Component({
	selector: 'app-genere-id',
	templateUrl: './genere-id.component.html',
	styleUrls: ['./genere-id.component.scss'],
})
export class GenereIdComponent implements OnInit, OnDestroy {
	protected idGenere = new Subject<string>();
	private subscription!: Subscription;
	protected dataGenere: Generi | null = null;

	dataFilmGenere: Film[] = [];
	dataSerieGenere: SerieTv[] = [];

	constructor(private route: ActivatedRoute, private apiGeneri: ApiGeneriService) {}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	ngOnInit(): void {
		//Sottoscrivo il subject ogni volta che ricevo un id
		this.subscription = this.idGenere
			.pipe(
				switchMap((idGenere) => {
					this.dataGenere = null;
					return this.apiGeneri.getGenereId(idGenere);
				}),
			)
			.subscribe({
				next: (data: Generi) => (this.dataGenere = data),
				error: (error) => console.error("C'è stato un errore!", error),
				complete: () => {},
			});

		// Trovo l'idGenere e lo passo al subject
		this.route.paramMap.subscribe((params) => {
			const id = params.get('id');
			if (id) {
				this.idGenere.next(id);
			}
		});
	}
}
