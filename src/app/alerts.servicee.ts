import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertsModel } from './models/alerts.model';

@Injectable()
export class AlertsService {

    constructor(
        public alert: AlertController
    ) {
    }

    async presetAlert(dataMessage: AlertsModel) {
        let alert;
        const message = dataMessage.message.toString();
        const buttons = [];
        buttons.push({
            text: dataMessage.button || 'Ok',
        });
        alert = await this.alert.create({
            message,
            buttons
        });
        await alert.present();
    }
}
