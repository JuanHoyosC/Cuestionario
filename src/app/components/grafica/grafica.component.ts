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
    this.sumarDatosIguales(datos).forEach(res => {
      colores.push(this.colores[res.dato - 1])
    });

    return  [ { backgroundColor: colores } ];
  }

  obtenerPorcentaje(datos: any[]): Label[] {
    let porcentajes: Label[] = [];
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
    const myUniqueArray = [...new Set(datos)];
    let resultado = []
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
