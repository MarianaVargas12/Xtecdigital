import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessengerService} from '../../MessengerService';

@Component({
  selector: 'app-listacursos',
  templateUrl: './listacursos.component.html',
  styleUrls: ['./listacursos.component.scss']
})
export class ListacursosComponent implements OnInit {
  respuesta: any;
  cursos: any;
  codigo: string;
  nombre: string;
  carrera: string;
  creditos: string;
  habilitado: boolean;
  cedulaAdmin: string;
  constructor(public httpService: HttpClient, public messenger: MessengerService ) {
  }

  setCursos(): void{
    this.httpService.post(this.messenger.urlServer + 'Curso/verCursos', {}).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.cursos = resp;
        console.log(resp);
      }
      );
  }

  ngOnInit(): void {
    this.setCursos();
  }
  agregar(): void{
    this.codigo = (document.getElementById('codigo') as HTMLInputElement).value;
    this.nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    this.carrera = (document.getElementById('carrera') as HTMLInputElement).value;
    this.creditos = (document.getElementById('creditos') as HTMLInputElement).value;
    this.habilitado = true;
    this.cedulaAdmin = this.messenger.usuario.cedula;
    this.httpService.post(this.messenger.urlServer + 'Curso/crearCurso',
      {
        codigo: this.codigo,
        nombre: this.nombre,
        carrera: this.carrera,
        creditos: +this.creditos,
        habilitado: this.habilitado,
        cedulaAdmin: this.cedulaAdmin
            }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.respuesta = resp;
        // tslint:disable-next-line:triple-equals
        if (resp[0].respuesta != 'error'){
          this.ngOnInit();
        }else{
          alert(resp[0].error);
        }
      }
    );
  }
  eliminar(codigoCurso): void{
    this.httpService.post(this.messenger.urlServer + 'Curso/habilitar_deshabilitarCurso', {codigo: codigoCurso}).subscribe(
      (resp: HttpResponse<any>) =>
      {
        console.log('Curso deshabilitado');
      }
    );
  }

}
