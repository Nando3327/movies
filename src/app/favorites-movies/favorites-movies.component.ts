import { Component, OnDestroy, OnInit } from '@angular/core';
import { FavoritesMoviesService } from './favorites-movies.service';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';
import { NetworkService } from '../network.service';
import { BagStoreService } from '../../store/entity/bag';
import { Subscription } from 'rxjs';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-favorites-movies',
    templateUrl: './favorites-movies.component.html',
    styleUrls: ['./favorites-movies.component.scss'],
})
export class FavoritesMoviesComponent implements OnInit, OnDestroy {

    showMovies = false;
    movies: Array<any>;
    globalLabels: any;
    labels: any;
    private subscriptions: Subscription[] = [];

    constructor(private favoriteMoviesService: FavoritesMoviesService,
                private translate: TranslateService,
                public navCtrl: NavController,
                private store: BagStoreService,
                public networkService: NetworkService) {
    }

    ngOnInit() {
        this.loadLabels();
        this.networkService.testNetworkConnection();
        this.subscriptions.push(this.networkService.hasConnection.subscribe((connected: boolean) => {
            this.showMovies = true;
            if (!connected) {
                this.movies = this.getTopValues(this.store.getBagValue('movies') || [], environment.moviesToShow, 'popularity');
            } else {
                this.favoriteMoviesService.getMovies().subscribe(ret => {
                    this.movies = this.getTopValues(ret, 10, 'popularity');
                }, error => {
                    console.log(error);
                });
            }
        }));
    }

    getTopValues(arr, n, prop): Array<any> {
        const sortByCount = arr.sort((a, b) => {
            return b[prop] - a[prop];
        });
        if (sortByCount.length > n) {
            return sortByCount.slice(0, n);
        }
        return sortByCount;
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

    ngOnDestroy(): void {
        this.subscriptions.forEach(sb => sb.unsubscribe());
    }

}
