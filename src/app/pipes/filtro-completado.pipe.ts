import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroCompletado',
  pure: false //Cada vez que se detecte un cambio en cualquier lado se va a actualizar
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(listas: Lista[], completada : boolean = true): Lista[] {
    
    return listas.filter(lista => lista.termiada === completada);
  }

}
