import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavoritesMoviesComponent } from './favorites-movies.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FavoritesMoviesService } from './favorites-movies.service';
import { BagQuery, BagStore, BagStoreService } from '../../store/entity/bag';
import { RouterTestingModule } from '@angular/router/testing';
import { NetworkService } from '../network.service';
import { Network } from '@ionic-native/network/ngx';
import { of } from 'rxjs';

describe('FavoritesMoviesComponent', () => {
  let component: FavoritesMoviesComponent;
  let fixture: ComponentFixture<FavoritesMoviesComponent>;

  let httpClientSpy: { get: jasmine.Spy, delete: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy };
  let favoritesMoviesService: FavoritesMoviesService;
  let storeService: BagStoreService;
  let bagQuery: BagQuery;
  let bagStore: BagStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesMoviesComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslateFakeLoader
        }
      }), RouterTestingModule],
      providers: [FavoritesMoviesService, BagStoreService, NetworkService, Network]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'delete', 'post', 'put']);
    bagStore = new BagStore();
    bagQuery = new BagQuery(bagStore);
    storeService = new BagStoreService(bagQuery, bagStore);
    favoritesMoviesService = new FavoritesMoviesService(httpClientSpy as any, storeService as any);
  });

  it('should return movies', () => {
    const expectedResult =
        {
          page: 1,
          total_results: 10000,
          total_pages: 500,
          results: [
            {
              popularity: 2517.138,
              vote_count: 65,
              video: false,
              poster_path: '/ugZW8ocsrfgI95pnQ7wrmKDxIe.jpg',
              id: 724989,
              adult: false,
              backdrop_path: '/86L8wqGMDbwURPni2t7FQ0nDjsH.jpg',
              original_language: 'en',
              original_title: 'Hard Kill',
              genre_ids: [
                28,
                53
              ],
              title: 'Hard Kill',
              vote_average: 4.7,
              overview: 'The work of billionaire tech CEO Donovan Chalmers is so valuable that he hires mercenaries to protect it, and a terrorist group kidnaps his daughter just to get it.',
              release_date: '2020-10-23'
            }
          ]
        };
    httpClientSpy.get.and.returnValue(of(expectedResult));
    favoritesMoviesService.getMovies().subscribe(
        result => {
          expect(result).toEqual(expectedResult.results, 'expected movies');
        },
        fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
