export interface Clase {
    id: string
    curso: {
        nombre: string
        profesor: string
    }
    dia: string
    horario: {
        hora_inicio: string
        hora_termino: string
    }
    sala: string
}