import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent],
  providers: [ProfileService],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
