import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
	selector: '[appCardScroll]',
})
export class CardScrollDirective {
	constructor(private elemento: ElementRef, private render: Renderer2) {}

	@HostListener('click', ['$event.target']) onClick(target: HTMLElement) {
		if (target.classList.contains('prevBtn')) {
			this.scrollLeft();
		} else if (target.classList.contains('nextBtn')) {
			this.scrollRight();
		}
	}

	private scrollLeft() {
		const contenitore = this.elemento.nativeElement.querySelector('.scrollContent');
		const cardWidth = this.getPosition();
		const scrollValue = cardWidth;
		if (contenitore) {
			const currentScroll = contenitore.scrollLeft;
			contenitore.scrollTo({ left: currentScroll - scrollValue, behavior: 'smooth' });
		}
	}

	private scrollRight() {
		const contenitore = this.elemento.nativeElement.querySelector('.scrollContent');
		const cardWidth = this.getPosition();
		const scrollValue = cardWidth;
		if (contenitore) {
			const currentScroll = contenitore.scrollLeft;
			contenitore.scrollTo({ left: currentScroll + scrollValue, behavior: 'smooth' });
		}
	}

	private getPosition() {
		const elementRect = this.elemento.nativeElement.querySelector('app-card').getBoundingClientRect();
		if (!elementRect) {
			console.error(404);
		} else {
			return elementRect.width;
		}
	}
}
