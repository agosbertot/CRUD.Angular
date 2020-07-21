export class HeroeModel {
    id: string;
    nombre: string;
    poder: string;
    vivo: boolean;


    constructor() {
        // es decir cuando yo creo una nueva instancia de HeroeModel por defecto vivo sera true
        this.vivo = true;
    }

}