import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-horario',
  templateUrl: './card-horario.component.html',
  styleUrls: ['./card-horario.component.scss'],
})
export class CardHorarioComponent  implements OnInit {

  @Input() nombre : string='Nombre curso';
  @Input() hora_inicio : string='00:00';
  @Input() hora_termino : string='00:00';
  @Input() profesor : string='Nombre profesor';
  @Input() sala : string='Nombre sala';

  isSelected: boolean = false;

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.checkSelection();
    }, 1000); // Verifica la hora cada segundo
  }

  checkSelection(): void {
    // Obten la hora actual en formato 'HH:mm'
    const horaActual = new Date().toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'});

    // Establece isSelected en true si la hora actual está entre los rangos permitidos
    this.isSelected = horaActual >= '10:01' && horaActual <= '11:20';
  }

}
