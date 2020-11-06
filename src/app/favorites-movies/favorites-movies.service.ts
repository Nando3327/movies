import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class FavoritesMoviesService {

  constructor(private http: HttpClient) {
  }

  getMovies(): Observable<any> {
    return this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=1b501bbda107113acc653f328a2e935d').pipe(
        map((response: any) => {
          return response.results || [];
        }),
        catchError(err => {
          return throwError(err);
        })
    );
  }
}
