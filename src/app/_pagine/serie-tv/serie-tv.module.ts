import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SerieTvRoutingModule } from './serie-tv-routing.module';
import { SerieTvComponent } from './serie-tv.component';
import { StreamingKitModule } from 'src/app/_condivisi/streaming-kit/streaming-kit.module';

@NgModule({
	declarations: [SerieTvComponent],
	imports: [CommonModule, SerieTvRoutingModule, StreamingKitModule],
})
export class SerieTvModule {}
