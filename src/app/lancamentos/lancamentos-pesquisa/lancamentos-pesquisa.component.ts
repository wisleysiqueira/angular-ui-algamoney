import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService } from 'primeng/api';

import { Table } from 'primeng/table';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';



@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') grid: Table;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService
    ) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }
  
  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        //this.grid.reset();
        if(this.lancamentos.length == 1 && this.filtro.pagina > 0) {
          this.grid.first = (this.filtro.pagina - 1) * this.filtro.itensPorPagina; // que dispara o evento e chama o pesquisar na página anterior
        } else {
          this.pesquisar(this.filtro.pagina); // pesquisa na página atual
        }

        this.messageService.add({severity: 'success', detail: 'Lancamento excluído com sucesso!'});
      });
  }

}