import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavoritesMoviesComponent } from './favorites-movies.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FavoritesMoviesService } from './favorites-movies.service';
import { BagStoreService } from '../../store/entity/bag';
import { RouterTestingModule } from '@angular/router/testing';
import { NetworkService } from '../network.service';
import { Network } from '@ionic-native/network/ngx';

describe('FavoritesMoviesComponent', () => {
  let component: FavoritesMoviesComponent;
  let fixture: ComponentFixture<FavoritesMoviesComponent>;

  let httpClientSpy: { get: jasmine.Spy, delete: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy };
  let favoritesMoviesService: FavoritesMoviesService;
  const storeService: BagStoreService;

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
    favoritesMoviesService = new FavoritesMoviesService(httpClientSpy as any, storeService as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
