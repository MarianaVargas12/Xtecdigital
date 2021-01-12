import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessengerService} from '../../MessengerService';
@Component({
  selector: 'app-pantalla-cursos',
  templateUrl: './pantalla-cursos.component.html',
  styleUrls: ['./pantalla-cursos.component.scss']
})
export class PantallaCursosComponent implements OnInit {
  misGrupos: any;
  constructor(public httpService: HttpClient, public messenger: MessengerService) { }

  ngOnInit(): void {
    this.setMisGrupos();
  }

  setMisGrupos(): void{
    this.httpService.post(this.messenger.urlServer + 'Usuario/verCursosEstudiante', {
      carnet: this.messenger.usuario.carnet
    }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.misGrupos = resp;
        console.log(resp);
      }
    );
  }
}
