import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatRippleModule,
    MatPaginatorModule
  ],
  exports: [
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatRippleModule,
    MatPaginatorModule
  ]
})
export class NgMaterialModule { }
