import { Empleado } from './empleado.model';

export class Administrador {
    uid: string;
    email: string;
    empleados: Empleado[] = [];

    constructor(uid: string, email: string) {
        this.uid = uid;
        this.email = email;
    }
}