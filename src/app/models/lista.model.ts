import { ListaItem } from "./lista-item.model";

export class Lista {
    
    id: number;
    titulo: string;
    creadaEn: Date;
    termiadaEn?: Date;
    termiada: boolean;
    items: ListaItem[];
    
    constructor(titulo:string, ) {
        this.titulo = titulo; 
        this.creadaEn = new Date();
        this.termiada = false; 
        this.items = []; 
        this.id = new Date().getTime();
    }
}