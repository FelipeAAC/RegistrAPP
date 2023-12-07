import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [MenuComponent],
    imports: [
        IonicModule,
        RouterModule],
    exports: [MenuComponent]
})
export class MenuModule { }
