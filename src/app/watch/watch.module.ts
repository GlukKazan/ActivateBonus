import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchComponent } from './watch.component';
import { WatchService } from './watch.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WatchComponent],
  providers: [WatchService],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class WatchModule { }
