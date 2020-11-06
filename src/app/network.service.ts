import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { Observable, fromEvent, merge, of, BehaviorSubject } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class NetworkService {

    private online: Observable<boolean> = null;
    public hasConnection = new BehaviorSubject(false);

    constructor(
        private network: Network,
        private platform: Platform,
        private http: HttpClient) {

        if (this.platform.is('cordova')) {
            // on Device
            this.network.onConnect().subscribe(() => {
                this.hasConnection.next(true);
                return;
            });
            this.network.onDisconnect().subscribe(() => {
                this.hasConnection.next(false);
                return;
            });
        } else {
            // on Browser
            this.online = merge(
                of(navigator.onLine),
                fromEvent(window, 'online').pipe(mapTo(true)),
                fromEvent(window, 'offline').pipe(mapTo(false))
            );

            this.online.subscribe((isOnline) => {
                if (isOnline) {
                    this.hasConnection.next(true);
                } else {
                    this.hasConnection.next(false);
                }
            });
        }
        this.testNetworkConnection();
    }

    private getNetworkTestRequest(): Observable<any> {
        return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
    }

    public async testNetworkConnection() {
        try {
            this.getNetworkTestRequest().subscribe(
                success => {
                    console.log(success);
                    this.hasConnection.next(true);
                    return;
                }, error => {
                    console.log(error);
                    this.hasConnection.next(false);
                    return;
                });
        } catch (err) {
            console.log('err testNetworkConnection', err);
            this.hasConnection.next(false);
            return;
        }
    }
}
