import { Component, OnInit, Input } from '@angular/core';

import { ChartType } from 'chart.js';

import { Empleado } from '../../models/empleado.model';


@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {


  @Input() empleado: Empleado;
  public colores: any[] = ['#EF6E69', '#F19A43', '#F7CE43', '#6CA0CC', '#77C14E']
  public pieChartData: number[] = [2, 3, 1];
  public pieChartType: ChartType = 'pie';
  public pieChartColors = [
    {
      backgroundColor: ['#77C14E', 'rgba(0,255,0,0.3)', 'rgba(255,255,255,0.3)']
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

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
