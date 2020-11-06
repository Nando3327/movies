import { Component, OnInit } from '@angular/core';
import { FavoritesMoviesService } from './favorites-movies.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

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
                private translate: TranslateService,
                public navCtrl: NavController) {
    }

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
        this.navCtrl.navigateForward(['/movie-detail'], {queryParams: movie, replaceUrl: true});
    }

}
