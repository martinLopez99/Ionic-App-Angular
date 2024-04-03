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

    return nuevaLista.id;
  }
   
  obtenerLista( id: string | number) {
    id = Number(id);
    return this.listas.find( listaData => listaData.id === id);
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

  borrarLista(lista: Lista){

    this.listas = this.listas.filter( listaData => listaData.id !== lista.id)
    this.guardarStorage();
  }
}
