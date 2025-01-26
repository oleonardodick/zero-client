import { Colecao, PastaColecao } from '@prisma/client';
import { RequisicaoDTO } from '../dtos/requisicao.dto';
import { RespostaDTO } from '../dtos/resposta.dto';

const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
  salvarJson: (dadosJson: object, nomeArquivo: string) =>
    electron.ipcRenderer.invoke('salvarJson', dadosJson, nomeArquivo),
  importarJson: () => electron.ipcRenderer.invoke('importarJson'),

  buscaTodasVariaveisAmbiente: () =>
    electron.ipcRenderer.invoke('buscaTodasVariaveisAmbiente'),
  criaVariavelAmbiente: (nome: string, valor: string) =>
    electron.ipcRenderer.invoke('criaVariavelAmbiente', nome, valor),
  atualizaVariavelAmbiente: (nome: string, valor: string) =>
    electron.ipcRenderer.invoke('atualizaVariavelAmbiente', nome, valor),
  excluiVariavelAmbiente: (nome: string) =>
    electron.ipcRenderer.invoke('excluiVariavelAmbiente', nome),

  criaRequisicao: (requisicao: RequisicaoDTO) =>
    electron.ipcRenderer.invoke('criaRequisicao', requisicao),
  atualizaRequisicao: (requisicao: RequisicaoDTO) =>
    electron.ipcRenderer.invoke('atualizaRequisicao', requisicao),
  buscaUltimasRequisicoes: () =>
    electron.ipcRenderer.invoke('buscaUltimasRequisicoes'),
  buscaRequisicaoPorId: (id: string) =>
    electron.ipcRenderer.invoke('buscaRequisicaoPorId', id),
  excluiRequisicao: (id: string) =>
    electron.ipcRenderer.invoke('excluiRequisicao', id),

  criaResposta: (resposta: RespostaDTO, requisicao_id: string) =>
    electron.ipcRenderer.invoke('criaResposta', resposta, requisicao_id),
  atualizaResposta: (resposta: RespostaDTO, requisicao_id: string) =>
    electron.ipcRenderer.invoke('atualizaResposta', resposta, requisicao_id),

  buscaColecoes: () => electron.ipcRenderer.invoke('buscaColecoes'),
  criaColecao: (colecao: Colecao) =>
    electron.ipcRenderer.invoke('criaColecao', colecao),
  atualizaColecao: (colecao: Colecao) =>
    electron.ipcRenderer.invoke('atualizaColecao', colecao),
  excluiColecao: (id: string) =>
    electron.ipcRenderer.invoke('excluiColecao', id),

  buscaPastasColecao: (colecao_id: string) =>
    electron.ipcRenderer.invoke('buscaPastasColecao', colecao_id),
  criaPastaColecao: (pasta: PastaColecao) =>
    electron.ipcRenderer.invoke('criaPastaColecao', pasta),
  atualizaPastaColecao: (pasta: PastaColecao) =>
    electron.ipcRenderer.invoke('atualizaPastaColecao', pasta),
  excluiPastaColecao: (id: string) =>
    electron.ipcRenderer.invoke('excluiPastaColecao', id),
});
