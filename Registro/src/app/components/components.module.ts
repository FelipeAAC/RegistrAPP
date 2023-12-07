import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { BotonComponent } from "./boton/boton.component";
import { CardHorarioComponent } from "./card-horario/card-horario.component";
import { CardCursoComponent } from "./card-curso/card-curso.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        BotonComponent,
        CardHorarioComponent,
        CardCursoComponent
    ],
    exports: [
        BotonComponent,
        CardHorarioComponent,
        CardCursoComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ]
})
export class ComponentsModule{}