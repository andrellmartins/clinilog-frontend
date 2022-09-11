import { Component, OnInit } from '@angular/core';
import { Person } from '../../model/person';
import { PersonService } from '../../service/person.service';

@Component({
  selector: 'app-person-grid',
  templateUrl: './person-grid.component.html',
  styleUrls: ['./person-grid.component.css']
})
export class PersonGridComponent implements OnInit {

  public pessoas!:Person[];

  public pessoasColumns = [
    'nome',
    'cpf',
    'data_nasc',
  ];
  

  constructor(
    private personService:PersonService
  ) { }

  ngOnInit(): void {
    this.carregarPessoas();
  }

  carregarPessoas(){
    this.personService.consultaPessoas()
    .subscribe({
      next: (pessoas:Person[]) => {
        this.pessoas = pessoas;
      },
      error(err) {
          console.log(err)
      },
    })
  }

}
