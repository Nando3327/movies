import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieDetailComponent } from './movie-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from '../headers/header.module';

const routes: Routes = [
  {
    path: '',
    component: MovieDetailComponent,
  },
  {
    path: '',
    redirectTo: '/movie-detail',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes), HttpClientModule, HeaderModule],
  declarations: [MovieDetailComponent],
  exports: [MovieDetailComponent, RouterModule]
})
export class MovieDetailModule {}
