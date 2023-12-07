import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { Curso } from 'src/app/interfaces/curso'; // Importa el tipo Curso
import { UserService } from '../../login/user.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  cursos: Curso[] = [];

  constructor(private fireServ: FirestoreService, private userService: UserService) {
    this.username = this.userService.getUsername();
  }

  ngOnInit() {
    this.obtenerCursos();
  }

  async obtenerCursos() {
    const cursosData: Curso[] = await this.fireServ.getCollection('CURSO');
    console.log (cursosData);
    // Asigna la ID del curso a cada objeto de curso
    this.cursos = cursosData.map(curso => {
      return {
        ...curso,
        id: curso.id // Asegúrate de que 'id' sea el nombre correcto del campo ID en tus datos de curso
      };
    });
  }

  username: string;

  
}
