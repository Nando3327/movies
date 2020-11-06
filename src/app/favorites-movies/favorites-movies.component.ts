import { Component, OnDestroy, OnInit } from '@angular/core';
import { FavoritesMoviesService } from './favorites-movies.service';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';
import { NetworkService } from '../network.service';
import { BagStoreService } from '../../store/entity/bag';
import { Subscription } from 'rxjs';

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
                this.movies =  this.store.getBagValue('movies') || [];
            }else {
                this.favoriteMoviesService.getMovies().subscribe(ret => {
                    this.movies = ret;
                }, error => {
                    console.log(error);
                });
            }
        }));

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
