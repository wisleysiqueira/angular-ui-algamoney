import { LancamentoService } from './lancamentos/lancamento.service';
import { CoreModule } from './core/core.module';
import { NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { HttpClientModule } from '@angular/common/http';
import { PessoaService } from './pessoas/pessoa.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CoreModule,
    HttpClientModule,
    ToastModule,
    ConfirmDialogModule,
    LancamentosModule,
    PessoasModule
  ],
  providers: [LancamentoService, PessoaService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
