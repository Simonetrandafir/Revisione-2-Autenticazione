import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenereIdRoutingModule } from './genere-id-routing.module';
import { GenereIdComponent } from './genere-id.component';
import { StreamingKitModule } from 'src/app/_condivisi/streaming-kit/streaming-kit.module';

@NgModule({
	declarations: [GenereIdComponent],
	imports: [CommonModule, GenereIdRoutingModule, StreamingKitModule],
})
export class GenereIdModule {}
