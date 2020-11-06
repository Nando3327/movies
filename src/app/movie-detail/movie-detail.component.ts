import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie-detail.component.html',
    styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {

    showMovie = false;
    item: any;
    globalLabels: any;
    labels: any;

    constructor(private translate: TranslateService,
                private activeRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.loadLabels();
        this.activeRoute.queryParams.subscribe(data => {
            if (data) {
                this.item = data;
                this.showMovie = true;
            }
        });
    }

    loadLabels(): void {
        this.translate.get(['favoritesMovies', 'global']).subscribe(labels => {
            this.globalLabels = labels.global;
            this.labels = labels.favoritesMovies;
        });
    }
}
