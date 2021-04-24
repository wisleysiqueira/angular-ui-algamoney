import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { PessoaFiltro, PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit{

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela') grid: Table;

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService
    
    ) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        if(this.pessoas.length == 1 && this.filtro.pagina > 0) {
          this.grid.first = (this.filtro.pagina - 1) * this.filtro.itensPorPagina; // que dispara o evento e chama o pesquisar na página anterior
        } else {
          this.pesquisar(this.filtro.pagina); // pesquisa na página atual
        }

        this.messageService.add({severity: 'success', detail: 'Pessoa excluída com sucesso!'});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
