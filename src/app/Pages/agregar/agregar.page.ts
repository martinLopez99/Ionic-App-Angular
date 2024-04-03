import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/lista-item.model';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit{

  lista:Lista;
  nombreItem = '';

  constructor(private deseoService:DeseosService, 
              private route:ActivatedRoute) { 
    const listaId = this.route.snapshot.paramMap.get('listaId'); //Esta es la variable que estoy esperando
    this.lista = this.deseoService.obtenerLista(listaId);


  }
   // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
   ngOnInit() {
   }

   agregarItem(){
    
    if (this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new ListaItem( this.nombreItem ); //Asi es como escucho el input del HTML
    this.lista.items.push(nuevoItem);

    this.nombreItem =''; //Asi limpio el item para despues usarlo de nuevo
    this.deseoService.guardarStorage();
   }
   
   cambioCheck( item:ListaItem){

    const pendientes = this.lista.items.filter( itemData => !itemData.completado ) // Devuelve un arreglo con todos los items que estan pendientes
                                       .length; //Ahora va a devolver cuantos elementos hay en el filtro
    
    if (pendientes === 0) {
      this.lista.termiadaEn = new Date();
      this.lista.termiada = true;
    } else {
      this.lista.termiadaEn = null;
      this.lista.termiada = false;
    }
    
    this.deseoService.guardarStorage();
   }

   borrar(i : number){
    this.lista.items.splice(i,1);
    this.deseoService.guardarStorage();
   }
}

