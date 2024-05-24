import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenitoreComponent } from './_componenti/contenitore/contenitore.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from './_componenti/card/card.component';
import { BreadcrumbComponent } from './_componenti/breadcrumb/breadcrumb.component';
import { BreadcrumbHomeComponent } from './_componenti/breadcrumb-home/breadcrumb-home.component';
import { CardHoverDirective } from 'src/app/_direttive/card-hover.directive';
import { CardScrollDirective } from 'src/app/_direttive/card-scroll.directive';

@NgModule({
	declarations: [ContenitoreComponent, CardComponent, BreadcrumbComponent, BreadcrumbHomeComponent, CardHoverDirective, CardScrollDirective],
	imports: [CommonModule, RouterModule],
	exports: [ContenitoreComponent, CardComponent, BreadcrumbComponent, BreadcrumbHomeComponent, CardHoverDirective, CardScrollDirective],
})
export class StreamingKitModule {}
