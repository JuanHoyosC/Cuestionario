import { Respuesta } from './respuesta.model';
export class Empleado {
    nombre: string;
    apellido: string;
    puesto: string;
    expendiente: string;
    encuestado: boolean = false;
    respuestas: Respuesta[] = [];

    constructor(nombre: string, apellido: string, puesto: string, expediente: string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.puesto = puesto;
        this.expendiente = expediente;
    }
}