import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritesMoviesComponent } from './favorites-movies.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'movies',
    component: FavoritesMoviesComponent,
  },
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [FavoritesMoviesComponent],
  exports: [FavoritesMoviesComponent, RouterModule]
})
export class FavoritesMoviesModule {}
