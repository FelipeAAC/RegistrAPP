import { Component } from '@angular/core';

// Define una interfaz para el objeto persona
interface Persona {
  nombre: string;
  porcentaje: number;
  asistencia: string;
  estado: string;
}


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  diasDelMes: string[] = ['Día 1', 'Día 2', 'Día 3', /* ... */];

  personas: Persona[] = [
    { nombre: 'Nicolás Díaz', porcentaje: 60, asistencia: '10/12', estado: 'En curso' },
    { nombre: 'Felipe Arcos', porcentaje: 60, asistencia: '12/12', estado: 'En curso' },
    { nombre: 'Mike Wasauski', porcentaje: 45, asistencia: '3/12', estado: 'En curso' }
  ];
  
  toggleAsistencia(persona: any, dia: string) {
    persona.asistencia[dia as string] = !persona.asistencia[dia as string];
  }

  agregarPersona() {
    const nuevaPersona: Persona = {
      nombre: '',
      porcentaje: 0,
      asistencia: '',
      estado: ''
    };
    this.personas.push(nuevaPersona);
  }
  
  editarInformacion(persona: Persona) {
    console.log("Editar información de", persona.nombre);
  }

  registrarManual(persona: Persona) {
    console.log("Registrar manualmente para", persona.nombre);
  }

  eliminarPersona(index: number) {
    this.personas.splice(index, 1);
  }
}
