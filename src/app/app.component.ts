import { Component, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network/ngx';
import { Subscription } from 'rxjs';
import { BagStoreService } from '../store/entity/bag';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy{
  showData = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private network: Network,
    private store: BagStoreService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.translate.use('en').subscribe(_ => {
        this.showData = true;
      });
      if (Capacitor.platform !== 'web') {
        this.initEvents();
      }else {
        this.store.setBagValue('connected', true);
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initEvents(): void {
    this.subscriptions.push(this.network.onDisconnect().subscribe(() => {
      this.store.setBagValue('connected', false);
    }));

    this.subscriptions.push(this.network.onConnect().subscribe(() => {
      this.store.setBagValue('connected', true);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
