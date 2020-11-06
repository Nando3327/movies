import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BagStoreService } from '../../store/entity/bag';

@Injectable()
export class FavoritesMoviesService {

    constructor(private http: HttpClient,
                private store: BagStoreService) {
    }

    getMovies(): Observable<any> {
        return this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=').pipe(
            map((response: any) => {
                this.store.setBagValue('movies', response.results || []);
                return response.results || [];
            }),
            catchError(err => {
                return throwError(err);
            })
        );
    }
}
