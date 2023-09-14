import { Component } from '@angular/core';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {



  students: any[] = [
    { name: 'Estudiante 1', attendance: 'Ausente' },
    { name: 'Estudiante 2', attendance: 'Presente' },
    { name: 'Estudiante 3', attendance: 'Justificado' },
    // Agrega más estudiantes según sea necesario
  ];

  selectedSegment: string = 'segment1';

  constructor() {
    
  }

  startScan() {
    // Función para iniciar la exploración
  }
}
