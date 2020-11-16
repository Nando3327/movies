import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertsModel } from './models/alerts.model';

@Injectable()
export class AlertsService {

    constructor(
        public alertController: AlertController
    ) {
    }

    async presentAlert(dataMessage: AlertsModel) {
        const alert = await this.alertController.create({
            header: 'Alert',
            message: dataMessage.message.toString(),
            buttons: ['OK']
        });

        await alert.present();
    }
}
