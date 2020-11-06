import { Component, OnInit } from '@angular/core';
import { FavoritesMoviesService } from './favorites-movies.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-favorites-movies',
  templateUrl: './favorites-movies.component.html',
  styleUrls: ['./favorites-movies.component.scss'],
})
export class FavoritesMoviesComponent implements OnInit {

  showMovies = false;
  movies: Array<any>;
  globalLabels: any;
  labels: any;

  constructor(private favoriteMoviesService: FavoritesMoviesService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.loadLabels();
    this.favoriteMoviesService.getMovies().subscribe(ret => {
      this.showMovies = true;
      this.movies = ret;
      console.log(ret);
    }, error => {
      console.log(error);
    });
  }

  loadLabels(): void {
    this.translate.get(['favoritesMovies', 'global']).subscribe(labels => {
      this.globalLabels = labels.global;
      this.labels = labels.favoritesMovies;
    });
  }

  goToMovieDetail(movie): void {
    console.log(movie);
    console.log(this.globalLabels);
    console.log(this.labels);
  }

}
