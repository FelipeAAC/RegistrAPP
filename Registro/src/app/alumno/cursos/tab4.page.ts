import { Component } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  asistencias: any[] = [
    { fecha: 'Lunes 01/03/2023', estado: 'Presente' },
    { fecha: 'Miércoles 12/05/2023', estado: 'Presente' },
    { fecha: 'Viernes 23/09/2023', estado: 'Presente' },
    { fecha: 'Martes 04/07/2023', estado: 'Ausente' },
    { fecha: 'Jueves 15/12/2023', estado: 'Presente' },
    { fecha: 'Sábado 22/04/2023', estado: 'Presente' },
    { fecha: 'Domingo 30/10/2023', estado: 'Ausente' },
    { fecha: 'Lunes 20/02/2023', estado: 'Presente' },
    { fecha: 'Miércoles 08/11/2023', estado: 'Presente' },
    { fecha: 'Viernes 27/01/2023', estado: 'Ausente' },
  ];

  limiteMostrar = 4;
  mostrarBotonVerMas = true;

  verMas() {
    this.limiteMostrar = this.asistencias.length;
    this.mostrarBotonVerMas = false;
  }
}
