import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritesMoviesComponent } from './favorites-movies.component';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesMoviesService } from './favorites-movies.service';
import { HttpClientModule } from '@angular/common/http';

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
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes), HttpClientModule],
  declarations: [FavoritesMoviesComponent],
  exports: [FavoritesMoviesComponent, RouterModule],
  providers: [FavoritesMoviesService]
})
export class FavoritesMoviesModule {}
