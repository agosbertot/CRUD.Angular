import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';
//el map puede transformar lo que un observable puede regresar

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://autenticacionapp-64158.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe( map ( ( resp:any ) => {
      heroe.id = resp.name;
      return heroe;
    }));
  }

  actualizarHeroe( heroe: HeroeModel){

    //creo y envio el heroeTemp (heroe temporal) para poder borrar el id y que no me lo guarde en firebase como una nueva propedad cada vez que edito el heroe
    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

getHeroes(){
  return this.http.get(`${this.url}/heroes.json`).pipe( map( resp => this.crearArreglo(resp)))
}

private crearArreglo( heroesObj: object){

  const heroes: HeroeModel[] = [];
  
  // el if siguiente es para cuando todavia esta vacia la base de datos
  if (heroesObj === null) { return [];}

  Object.keys( heroesObj ).forEach( key => {
    const heroe: HeroeModel = heroesObj[key];
    heroe.id = key;
    heroes.push(heroe);
  });
  return heroes;
}


//Para EDITAR
getHeroe( id: string){
return this.http.get(`${this.url}/heroes/${id}.json`);
}

borrarHeroe(id: string){
  return this.http.delete(`${this.url}/heroes/${id}.json`);
}

}
