import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2PageRoutingModule } from './tab2-routing.module';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { QRCodeModule } from 'angularx-qrcode';

import { Tab2Page } from './tab2.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    QRCodeModule
  ],
  declarations: [Tab2Page],
})
export class Tab2PageModule {}