import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FavoritesMoviesService } from './favorites-movies.service';
import { TranslateService } from '@ngx-translate/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { NetworkService } from '../network.service';
import { BagStoreService } from '../../store/entity/bag';
import { Subscription } from 'rxjs';
import { LoadingService } from '../loading.servicee';

@Component({
    selector: 'app-favorites-movies',
    templateUrl: './favorites-movies.component.html',
    styleUrls: ['./favorites-movies.component.scss'],
})
export class FavoritesMoviesComponent implements OnInit, OnDestroy {

    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

    showMovies = false;
    movies: Array<any>;
    globalLabels: any;
    labels: any;
    slice = 20;
    page = 1;
    private subscriptions: Subscription[] = [];

    constructor(private favoriteMoviesService: FavoritesMoviesService,
                private translate: TranslateService,
                public navCtrl: NavController,
                private store: BagStoreService,
                public networkService: NetworkService,
                public loadingService: LoadingService) {
    }

    ngOnInit() {
        this.loadLabels();
        this.networkService.testNetworkConnection();
        this.subscriptions.push(this.networkService.hasConnection.subscribe((connected: boolean) => {
            this.movies = [];
            this.page = 1;
            this.showMovies = true;
            if (!connected) {
                this.movies = this.store.getBagValue('movies') || [];
            } else {
                this.loadingService.presentLoading();
                this.favoriteMoviesService.getMovies(this.page).subscribe(ret => {
                    this.loadingService.dismissLoading();
                    this.movies = ret;
                }, error => {
                    console.log(error);
                });
            }
        }));
    }

    loadDataInfiniteScroll(event) {
        this.page++;
        this.favoriteMoviesService.getMovies(this.page).subscribe(ret => {
            if (ret.length === 0) {
                this.infiniteScroll.disabled = true;
            }
            this.movies = this.movies.concat(ret);
            event.target.complete();
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

    ngOnDestroy(): void {
        this.subscriptions.forEach(sb => sb.unsubscribe());
    }

}
