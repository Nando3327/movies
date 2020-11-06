import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title = '';
  @Input() showBack = false;
  @Input() previusUrl = '';

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  back(){
    this.navCtrl.navigateBack([this.previusUrl]);
  }
}
