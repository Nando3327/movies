import { Component, OnInit, ViewChild } from '@angular/core';
import { FavoritesMoviesService } from './favorites-movies.service';
import { TranslateService } from '@ngx-translate/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { NetworkService } from '../network.service';
import { BagStoreService } from '../../store/entity/bag';
import { LoadingService } from '../loading.servicee';
import { DataMovie } from './models/movie.model';
import { AlertsService } from '../alerts.servicee';

@Component({
    selector: 'app-favorites-movies',
    templateUrl: './favorites-movies.component.html',
    styleUrls: ['./favorites-movies.component.scss'],
})
export class FavoritesMoviesComponent implements OnInit {

    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

    showMovies = false;
    movies: Array<DataMovie>;
    globalLabels: any;
    labels: any;
    slice = 20;
    page = 1;

    constructor(private favoriteMoviesService: FavoritesMoviesService,
                private translate: TranslateService,
                public navCtrl: NavController,
                private store: BagStoreService,
                public networkService: NetworkService,
                public loadingService: LoadingService,
                public alertsService: AlertsService) {
    }

    ngOnInit() {
        this.loadLabels();
    }

    getData(): void {
        this.showMovies = true;
        this.networkService.testNetworkConnection().subscribe((connected: boolean) => {
            this.movies = [];
            this.page = 1;
            if (!connected) {
                this.movies = this.store.getBagValue('movies') || [];
            } else {
                this.loadingService.presentLoading();
                this.favoriteMoviesService.getMovies(this.page).subscribe((ret: Array<DataMovie>) => {
                    this.loadingService.dismissLoading();
                    this.movies = ret;
                }, error => {
                    console.log(error);
                    this.alertsService.presentAlert({message: this.globalLabels.errors.genericErrorMessage});
                });
            }
        }, _ => {
            this.movies = this.store.getBagValue('movies') || [];
            if (this.movies.length === 0) {
                this.alertsService.presentAlert({message: this.globalLabels.errors.genericErrorMessage});
            }
        });
    }

    loadDataInfiniteScroll(event) {
        this.page++;
        this.favoriteMoviesService.getMovies(this.page).subscribe((ret: Array<DataMovie>) => {
            if (ret.length === 0) {
                this.infiniteScroll.disabled = true;
            }
            this.movies = this.movies.concat(ret);
            event.target.complete();
        }, error => {
            console.log(error);
            this.infiniteScroll.disabled = true;
            event.target.complete();
            this.alertsService.presentAlert({message: this.globalLabels.errors.genericErrorMessage});
        });
    }

    loadLabels(): void {
        this.translate.get(['favoritesMovies', 'global']).subscribe(labels => {
            this.globalLabels = labels.global;
            this.labels = labels.favoritesMovies;
            this.getData();
        });
    }

    goToMovieDetail(movie): void {
        this.navCtrl.navigateForward(['/movie-detail'], {queryParams: movie, replaceUrl: true});
    }

}
