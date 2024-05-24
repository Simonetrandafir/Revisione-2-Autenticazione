import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
	selector: '[appCardHover]',
})
export class CardHoverDirective {
	@Input() nascosto!: HTMLElement;
	constructor(private elemento: ElementRef, private render: Renderer2) {}

	@HostListener('mouseenter') onMouseEnter() {
		this.hover();
	}

	@HostListener('mouseleave') onMouseLeave() {
		this.leave();
	}
	@HostListener('window:resize') onResize() {
		const [cardBody, logoFilm, cardInfo, cardFoot] = this.findElement();
		const altezzaCard: number = cardInfo.getBoundingClientRect().height + cardFoot.getBoundingClientRect().height;
		this.setPosition(altezzaCard);
	}

	private hover() {
		const [cardBody, logoFilm, cardInfo, cardFoot] = this.findElement();
		if (cardBody && logoFilm && cardFoot && cardInfo) {
			const altezzaCard: number = cardInfo.getBoundingClientRect().height + cardFoot.getBoundingClientRect().height;
			this.setPosition(altezzaCard);
			this.render.addClass(cardBody, 'hovered');
			this.render.addClass(logoFilm, 'hoverLogoFilm');
			this.render.setStyle(cardBody, 'z-index', '3');
		}
	}

	private leave() {
		const [cardBody, logoFilm, cardInfo, cardFoot] = this.findElement();
		if (cardBody && logoFilm && cardFoot && cardInfo) {
			const altezzaCard: number = cardInfo.getBoundingClientRect().height + cardFoot.getBoundingClientRect().height;
			this.setPosition(altezzaCard);
			this.render.removeClass(logoFilm, 'hoverLogoFilm');
			this.render.removeClass(cardBody, 'hovered');
			this.render.setStyle(cardBody, 'z-index', '-3');
		}
	}

	private setPosition(altezzaCard: number) {
		const elementoCard = this.elemento.nativeElement.getBoundingClientRect();
		const newTop = 0 - elementoCard.height - altezzaCard + 24;
		this.render.setStyle(this.nascosto, 'top', `${newTop}px`);
	}

	private findElement(): HTMLElement[] {
		const cardBody: HTMLElement = this.elemento.nativeElement.querySelector('.cardBody');
		const logoFilm: HTMLElement = this.elemento.nativeElement.querySelector('.logoFilm');
		const cardInfo: HTMLElement = this.elemento.nativeElement.querySelector('.cardInfo');
		const cardFoot: HTMLElement = this.elemento.nativeElement.querySelector('.cardFoot');
		return [cardBody, logoFilm, cardInfo, cardFoot];
	}
}
