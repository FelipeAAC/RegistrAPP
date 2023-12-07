import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Clase } from 'src/app/interfaces/clase';
import { Curso } from 'src/app/interfaces/curso';
import { UserService } from '../../login/user.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  clases: Clase[] = [];
  cursos: Curso[] = [];

  claseSeleccionada: string = '';
  qrCodeData: string = '';

  students: any[] = [
    { name: 'Estudiante 1', attendance: 'Ausente' },
    { name: 'Estudiante 2', attendance: 'Presente' },
    { name: 'Estudiante 3', attendance: 'Justificado' },
  ];

  selectedSegment: string = 'segment1';

  username: string;
  
  constructor(private fireServ: FirestoreService, private angularFirestore: AngularFirestore, private userService: UserService) {
    this.username = this.userService.getUsername();
  }

  ngOnInit(): void {
    this.obtenerClases();
  }

  async obtenerClases() {
    const clasesData: Clase[] = await this.fireServ.getCollection('CLASE');

    for (const clase of clasesData) {
      const cursoPath = `CURSO/${clase.curso}`;
      const horarioPath = `HORARIO/${clase.horario}`;

      const curso: any = await this.fireServ.getDocument(cursoPath);
      const horario: any = await this.fireServ.getDocument(horarioPath);
      if (curso && horario) {
        horario.hora_inicio = curso.nombre + " " + horario.hora_inicio + " a " + horario.hora_termino;
        clase.curso = horario.hora_inicio;
      }
    }
    // Asigna la ID del curso a cada objeto de curso
    this.clases = clasesData;
  }
  

  generarCodigo() {
    if (this.claseSeleccionada) {
      const fechaActual = new Date();
      const fechaFormateada = fechaActual.toLocaleString();
      
      this.fireServ.getDocument(`CLASE/${this.claseSeleccionada}`).then(claseData => {
        if (claseData && claseData['curso']) { // Verifica que claseData y curso estén definidos
          const asistenciaData = {
            fecha: fechaFormateada,
            clase: this.claseSeleccionada,
            estado: false,
            curso: claseData['curso'] // Accede a la propiedad 'curso' con notación de corchetes
          };
  
          const asistenciaPath = `ASISTENCIA/${this.claseSeleccionada}`;
          this.fireServ.setDocument(asistenciaPath, asistenciaData).then(() => {
            this.qrCodeData = JSON.stringify({ coleccion: 'ASISTENCIA', documento: this.claseSeleccionada });
          }).catch(error => {
            console.error('Error al crear la asistencia en la base de datos:', error);
          });
        } else {
          console.log('No se encontró información válida del curso asociado a la clase seleccionada.');
        }
      }).catch(error => {
        console.error('Error al obtener información de la clase:', error);
      });
    } else {
      console.log('Por favor, selecciona una clase.');
    }
  }
  
  

  generarDatos(longitud: number): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';
    for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      resultado += caracteres.charAt(indice);
    }
    return resultado;
  }

  


    
}
