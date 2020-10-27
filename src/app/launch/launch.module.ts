import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchComponent } from './launch.component';
import { FormsModule } from '@angular/forms';
import { LaunchService } from './launch.service';

@NgModule({
  declarations: [LaunchComponent],
  providers: [LaunchService],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class LaunchModule { }
