import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() {
    
    this.cargarStorage();
    // const lista1 = new Lista('Recolectar piedras del infinito');
    // const lista2 = new Lista('Heroes a desaparacer');

    // this.listas.push(lista1,lista2);
   }

  crearLista (titulo:string){
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();
  }
   
  guardarStorage(){
    localStorage.setItem('data', JSON.stringify(this.listas));
    
  }

  cargarStorage(){
    const data = localStorage.getItem('data');
      if (data !== null) {
        this.listas = JSON.parse(data);
      } else {
        this.listas = [];
      }
  }
}
