import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    //para editar heroe
  const id = this.route.snapshot.paramMap.get('id'); //es otra forma en lugar de subscribirme
    if( id !== 'nuevo'){
      this.heroesService.getHeroe(id).subscribe( (resp: HeroeModel) =>{
          this.heroe = resp;
          this.heroe.id = id;
      });
    }

}

  guardar(form: NgForm) {

    if (form.invalid) {
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando info',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

let peticion: Observable<any>;
//con esta peticion evito poner el .subscribe abajo en actualizar y crear heroe

    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      //para que la peticion se dispare tengo que poner un subscribe, en lugar de utilizar el subscribe puedo usar la peticion
      peticion = this.heroesService.crearHeroe(this.heroe);
        // this.heroe = resp; esto lo utilizo si pongo el subscribe aca
      }
      peticion.subscribe(resp => {
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se actualizo correctamente',
          icon: 'success'
        });
      })

  }

}
