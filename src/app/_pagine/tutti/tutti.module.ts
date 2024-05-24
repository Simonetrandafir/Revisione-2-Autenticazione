import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TuttiRoutingModule } from './tutti-routing.module';
import { TuttiComponent } from './tutti.component';
import { StreamingKitModule } from 'src/app/_condivisi/streaming-kit/streaming-kit.module';

@NgModule({
	declarations: [TuttiComponent],
	imports: [CommonModule, TuttiRoutingModule, StreamingKitModule],
})
export class TuttiModule {}
