import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementoRoutingModule } from './elemento-routing.module';
import { ElementoComponent } from './elemento.component';
import { ElementoKitModule } from 'src/app/_condivisi/elemento-kit/elemento-kit.module';

@NgModule({
	declarations: [ElementoComponent],
	imports: [CommonModule, ElementoRoutingModule, ElementoKitModule],
})
export class ElementoModule {}
