import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneriRoutingModule } from './generi-routing.module';
import { GeneriComponent } from './generi.component';
import { StreamingKitModule } from 'src/app/_condivisi/streaming-kit/streaming-kit.module';

@NgModule({
	declarations: [GeneriComponent],
	imports: [CommonModule, GeneriRoutingModule, StreamingKitModule],
})
export class GeneriModule {}
