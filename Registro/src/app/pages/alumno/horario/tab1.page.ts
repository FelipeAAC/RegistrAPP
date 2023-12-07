import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { UserService } from '../../login/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  datosLunes: any[] = [];
  datosMartes: any[] = [];
  datosMiercoles: any[] = [];
  datosJueves: any[] = [];
  datosViernes: any[] = [];
  datosSabado: any[] = [];
  datosDomingo: any[] = [];

  selectedSegment: string = this.getDay();
  isSelected: boolean = false;
  username: string;

  constructor(private firestoreService: FirestoreService, private userService: UserService) {
    this.loadClasesByDay('lunes', this.datosLunes);
    this.loadClasesByDay('martes', this.datosMartes);
    this.loadClasesByDay('miercoles', this.datosMiercoles);
    this.loadClasesByDay('jueves', this.datosJueves);
    this.loadClasesByDay('viernes', this.datosViernes);
    this.loadClasesByDay('sabado', this.datosSabado);
    this.loadClasesByDay('domingo', this.datosDomingo);
    this.username = this.userService.getUsername();
  }

  ngOnInit() {

  }


  getDay() {
    const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const day = new Date();
    const hoy = dias[day.getDay()];
    return hoy;
  }


  loadClasesByDay(diaEspecifico: string, arregloDestino: any[]) {
    this.firestoreService.listarClasesPorDia(diaEspecifico).then((data) => {
      if (data && data.length > 0) {
        arregloDestino.length = 0; // Limpia el arreglo antes de agregar nuevos datos
        arregloDestino.push(...data); // Agrega los datos al arreglo correspondiente
        console.log(`Clases del día ${diaEspecifico}:`, arregloDestino);
      } else {
        console.log(`No se encontraron clases para el día ${diaEspecifico}.`);
      }
    }).catch((error) => {
      console.error(`Error al obtener las clases del día ${diaEspecifico}:`, error);
    });
  }
}

export interface CardHorario {
  id: string;
  nombre: string;
  profesor: string;
}
