import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { ErrorMessageComponent } from "./error-message.component";

@NgModule({
    declarations: [
        ErrorMessageComponent
    ],
    exports: [
        ErrorMessageComponent
    ],
    imports: [
        IonicModule
    ]
})
export class ComponentsModule{}