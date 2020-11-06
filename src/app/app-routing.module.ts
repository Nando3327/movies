import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./favorites-movies/favorites-movies.module').then(m => m.FavoritesMoviesModule)
  },
  {
    path: 'movies',
    loadChildren: () => import('./favorites-movies/favorites-movies.module').then(m => m.FavoritesMoviesModule)
  },
  {
    path: 'movie-detail',
    loadChildren: () => import('./movie-detail/movie-detail.module').then(m => m.MovieDetailModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
