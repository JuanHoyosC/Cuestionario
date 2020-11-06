import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    //Convierte cada palabra del nombre completo en un array, la primera letra se pondra en mayuscula
    //Y se concatenara con las siguientes letras en minuscula, al final se uniran cada palabra del array para conformar el nombre completo
    return value.split(" ").map(palabra => palabra[0]         
      .toUpperCase() + palabra.slice(1, palabra.length).toLowerCase()).join(" ");
  }

}
