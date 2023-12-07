import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { getFirestore, setDoc, doc, getDoc, getDocs, collection as firestoreCollection } from '@angular/fire/firestore';
import { Asistencia } from 'src/app/interfaces/asistencia';
import { Clase } from 'src/app/interfaces/clase';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {}

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path: string) {
    const documentRef = doc(this.firestore.firestore, path);
    const docSnap = await getDoc(documentRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No se encontró el documento en el path: ', path);
      return null;
    }
  }

  async getCollection(path: string): Promise<any[]> {
    const collectionRef = firestoreCollection(this.firestore.firestore, path);
    const querySnapshot = await getDocs(collectionRef);
    const documents: any[] = [];
    querySnapshot.forEach((doc) => {
      const cursoData = doc.data();
      const cursoId = doc.id;
      documents.push({
        id: cursoId,
        ...cursoData
      });
    });
    return documents;
  }

  async listarAsistenciasPorCurso(idcurso: string): Promise<Asistencia[]> {
    const asistencias: Asistencia[] = [];
    const q = this.firestore.firestore.collection('ASISTENCIA').where('curso', '==', idcurso);

    const querySnapshot = await q.get();

    for (const doc of querySnapshot.docs) {
      const asistenciaData = doc.data() as Asistencia;
      const id = doc.id;

      const estado: string = asistenciaData.estado ? 'Presente' : 'Ausente';
      const fechaSinHora: string = asistenciaData.fecha.slice(0,9);

      const asistencia: Asistencia = {
        id,
        estado,
        fecha: fechaSinHora,
        clase: asistenciaData.clase,
        curso: asistenciaData.curso
      };

      asistencias.push(asistencia);
    }
    return asistencias;
  }

  async listarClasesPorDia(diaEspecifico: string): Promise<Clase[]> {
    const clases: Clase[] = [];
    const clasesCollection = this.firestore.collection('CLASE');
    const q = this.firestore.firestore.collection('CLASE').where('dia', '==', diaEspecifico);

    const querySnapshot = await q.get();

    for (const doc of querySnapshot.docs) {
      const claseData = doc.data() as Clase;
      const id = doc.id;
      const cursoId = claseData.curso;
      const horarioId = claseData.horario;

      const cursoPath = `CURSO/${cursoId}`;
      const horarioPath = `HORARIO/${horarioId}`;

      const [cursoData, horarioData] = await Promise.all([
        this.getDocument(cursoPath),
        this.getDocument(horarioPath)
      ]);

      if (cursoData && horarioData) {
        const profesorId = cursoData['profesor']; // ID del profesor
        const profesorData = await this.getDocument(`PROFESOR/${profesorId}`); // Obtener el documento del profesor
        const clase: Clase = {
          id,
          curso: {
            nombre: cursoData['nombre'],
            profesor: profesorData ? profesorData['nombre'] : 'Profesor desconocido'
          },
          dia: claseData.dia,
          horario: {
            hora_inicio: horarioData['hora_inicio'],
            hora_termino: horarioData['hora_termino']
          },
          sala: claseData.sala
        };
        clases.push(clase);
      }
    }

    return clases;
  }




}
