import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { DocumentData, doc, getDoc, getFirestore, collection } from 'firebase/firestore';

@Component({
  selector: 'app-card-curso',
  templateUrl: './card-curso.component.html',
  styleUrls: ['./card-curso.component.scss'],
})
export class CardCursoComponent  implements OnInit {

  @Input() id: string = "";
  @Input() nombre: string = "nombreCurso";
  @Input() profesor: string = "nombreProfesor";
  @Input() asistencias: any[] = [];

  limiteMostrar: number = 5;
  mostrarBotonVerMas: boolean = true;

  constructor(private firestore: AngularFirestore, private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.obtenerInfoCurso(); // Llama a obtenerInfoCurso() al inicializar el componente
  }

  obtenerInfoCurso() {
    this.firestoreService.getDocument('CURSO/' + this.id).then(async (cursoInfo: { [key: string]: any } | null) => {
      if (cursoInfo) {
        // Check if 'profesor' field exists and fetch professor's name
        if (cursoInfo['profesor']) {
          const professorDocRef = doc(collection(getFirestore(), 'PROFESOR'), cursoInfo['profesor']);
          const professorDocSnap = await getDoc(professorDocRef);
          if (professorDocSnap.exists()) {
            cursoInfo['profesor'] = professorDocSnap.data()?.['nombre'];
          }
        }
        // Now cursoInfo.profesor contains the professor's name if it was fetched successfully
        this.nombre = cursoInfo['nombre'];
        this.profesor = cursoInfo['profesor'];

        this.asistencias = await this.firestoreService.listarAsistenciasPorCurso(this.id);
      }
    }).catch(error => {
      console.error('Error al obtener información del curso:', error);
    });
  }


  

  verMas() {
    // Lógica para cargar más asistencias si hay más disponibles
    if (this.limiteMostrar < this.asistencias.length) {
      this.limiteMostrar += 5; // Mostrar 5 asistencias adicionales
    }
  }

  verMenos() {
    // Lógica para mostrar menos asistencias si el límite actual es mayor que 5
    if (this.limiteMostrar > 5) {
      this.limiteMostrar -= 5; // Mostrar 5 asistencias menos
    }
  }
}
