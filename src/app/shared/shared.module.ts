import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FilterPipe],
  exports: [CommonModule, ReactiveFormsModule, FormsModule, FilterPipe],
  providers: [],
})
export class SharedModule {}
