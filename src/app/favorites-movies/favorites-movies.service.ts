import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BagStoreService } from '../../store/entity/bag';
import { DataMovieResponse } from './models/movie.model';

@Injectable()
export class FavoritesMoviesService {

    constructor(private http: HttpClient,
                private store: BagStoreService) {
    }

    getMovies(page): Observable<any> {
        return this.http.get('https://api.themoviedb.org/3/movie/popular?[REPLACE]&page=' + page).pipe(
            map((response: DataMovieResponse) => {
                if (response && response.results) {
                    const responseMovies = this.store.getBagValue('movies') || [];
                    const responseToAdd = response.results || [];
                    if (responseMovies.length > 0 && responseToAdd.length > 0) {
                        this.store.setBagValue('movies', responseMovies.concat(responseToAdd));
                    } else if (responseMovies.length === 0 && responseToAdd.length > 0) {
                        this.store.setBagValue('movies', responseToAdd);
                    } else if (responseMovies.length === 0 && responseToAdd.length === 0) {
                        this.store.setBagValue('movies', []);
                    }
                }
                return response.results || [];
            }),
            catchError(err => {
                return throwError(err);
            })
        );
    }
}
