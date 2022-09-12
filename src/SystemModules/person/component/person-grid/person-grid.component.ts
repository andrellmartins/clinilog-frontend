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
    'acoes'
  ];
  

  constructor(
    private personService:PersonService,
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

  excluirPerson(idPerson:number){
    const confirm:boolean  = window.confirm("Tem certeza que deseja deletar um usuário ?");
    if(confirm){
      this.personService.excluirPessoa(idPerson).subscribe({
        next:(message:boolean) => {
          if(message){
            alert('Pessoa Deletada do Sistema')
            this.carregarPessoas();
          }
        }
      });
    }
  }

}
