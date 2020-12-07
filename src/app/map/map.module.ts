import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { FormsModule } from '@angular/forms';
import { MapService } from './map.service';

@NgModule({
  declarations: [MapComponent],
  providers: [MapService],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class MapModule { }
