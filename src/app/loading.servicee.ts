import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingService {
    isLoading = false;

    constructor(
        public loadingController: LoadingController
    ) {
    }

    async presentLoading() {
        this.isLoading = true;
        return await this.loadingController.create({
            spinner: 'bubbles'
        }).then(a => {
            a.present().then(() => {
                if (!this.isLoading) {
                    a.dismiss().then(() => console.log('abort presenting'));
                }
            });
        });
    }

    async dismissLoading() {
        this.isLoading = false;
        return await this.loadingController.dismiss().then(() => console.log('dismissed'));
    }
}
