import { Component, OnInit, Input } from '@angular/core';

import { ChartType } from 'chart.js';

import { Empleado } from '../../models/empleado.model';

import { Label } from 'ng2-charts';


@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent {


  @Input() empleado: Empleado;
  public colores: any[] = ['#EF6E69', '#F19A43', '#F7CE43', '#6CA0CC', '#77C14E']
  public pieChartType: ChartType = 'pie';

  constructor() { }

  obtenerDatos(datos: any[]) {
    let nuevosDatos = [];
    this.sumarDatosIguales(datos).forEach(res => nuevosDatos.push(res.suma));
    return nuevosDatos
  }

  obtenerColores(datos: any[]) {
    let colores = [];
    //Obtiene los colores del array y los ordena de modo que quede de acuerdo al puntaje que saco
    this.sumarDatosIguales(datos).forEach(res => {
      colores.push(this.colores[res.dato - 1])
    });

    //Los envia al canvas
    return  [ { backgroundColor: colores } ];
  }

  obtenerPorcentaje(datos: any[]): Label[] {
    let porcentajes: Label[] = [];
    //Obtiene cuantas veces aparece cada puntuación
    const resultado = this.sumarDatosIguales(datos);
    let sumaTotal = 0;

    //Obtiene cantidad de puntos
    resultado.forEach(res => {
      sumaTotal+=res.suma
    });

    //Divide la cantidad de puntos individuales entre los puntos totales
    resultado.forEach(res => {
      const porcentaje = Math.round((res.suma / sumaTotal) * 100);
      porcentajes.push(porcentaje + '%')
    });

    return  porcentajes;
  }

  sumarDatosIguales(datos: any[]): any[] {
    // crea un array sin repeteciones
    const myUniqueArray = [...new Set(datos)];
    let resultado = []
    // Suma la repeteciones de cada puntaje, es decir si 1 salio 3 veces y saco 2 solo una vez, lo hará de esta forma {1: 3, 2:1}
    for (let i = 0; i < myUniqueArray.length; i++) {
      let suma = 0;
      for (let j = 0; j < datos.length; j++) {
        if(myUniqueArray[i] === datos[j]){
          suma++;
        }
      }

      resultado.push({dato: Number(myUniqueArray[i]), suma: suma});
      
    }

    return resultado;
  }
 


}
