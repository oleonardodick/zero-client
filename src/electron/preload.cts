import { ColecaoDTO } from '../dtos/colecao.dto';
import { RequisicaoDTO } from '../dtos/requisicao.dto';
import { RespostaDTO } from '../dtos/resposta.dto';

const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
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
  criaColecao: (colecao: ColecaoDTO) =>
    electron.ipcRenderer.invoke('criaColecao', colecao),
  atualizaColecao: (colecao: ColecaoDTO) =>
    electron.ipcRenderer.invoke('atualizaColecao', colecao),
  excluiColecao: (id: string) =>
    electron.ipcRenderer.invoke('excluiColecao', id),
});
