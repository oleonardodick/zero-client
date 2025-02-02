import {
  Autenticacao,
  Basic,
  Bearer,
  Colecao,
  Header,
  PastaColecao,
  QueryParam,
  Requisicao,
  Resposta,
} from '@prisma/client';

const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
  //Métodos para importar e exportar json
  exportarJson: (dadosJson: Colecao, nomeArquivo: string) =>
    electron.ipcRenderer.invoke('exportarJson', dadosJson, nomeArquivo),
  importarJson: () => electron.ipcRenderer.invoke('importarJson'),

  //Métodos para controle de variáveis de ambiente
  buscaTodasVariaveisAmbiente: () =>
    electron.ipcRenderer.invoke('buscaTodasVariaveisAmbiente'),
  criaVariavelAmbiente: (nome: string, valor: string) =>
    electron.ipcRenderer.invoke('criaVariavelAmbiente', nome, valor),
  atualizaVariavelAmbiente: (nome: string, valor: string) =>
    electron.ipcRenderer.invoke('atualizaVariavelAmbiente', nome, valor),
  excluiVariavelAmbiente: (nome: string) =>
    electron.ipcRenderer.invoke('excluiVariavelAmbiente', nome),

  //Métodos para controle de requisição
  criaRequisicao: (requisicao: Requisicao) =>
    electron.ipcRenderer.invoke('criaRequisicao', requisicao),
  atualizaRequisicao: (requisicao: Requisicao) =>
    electron.ipcRenderer.invoke('atualizaRequisicao', requisicao),
  buscaUltimasRequisicoes: () =>
    electron.ipcRenderer.invoke('buscaUltimasRequisicoes'),
  buscaRequisicaoPorId: (id: string) =>
    electron.ipcRenderer.invoke('buscaRequisicaoPorId', id),
  buscaRequisicoesColecao: (colecao_id: string) =>
    electron.ipcRenderer.invoke('buscaRequisicoesColecao', colecao_id),
  buscaRequisicoesPasta: (pasta_id: string) =>
    electron.ipcRenderer.invoke('buscaRequisicoesPasta', pasta_id),
  excluiRequisicao: (id: string) =>
    electron.ipcRenderer.invoke('excluiRequisicao', id),

  //Métodos para controle da autenticação
  criaAutenticacao: (autenticacao: Autenticacao) =>
    electron.ipcRenderer.invoke('criaAutenticacao', autenticacao),
  criaAutenticacaoBasic: (basic: Basic) =>
    electron.ipcRenderer.invoke('criaAutenticacaoBasic', basic),
  criaAutenticacaoBearer: (bearer: Bearer) =>
    electron.ipcRenderer.invoke('criaAutenticacaoBearer', bearer),

  //Métodos para controle dos headers
  criaHeader: (headers: Header[]) =>
    electron.ipcRenderer.invoke('criaHeader', headers),

  //Métodos para controle do query param
  criaQueryParam: (params: QueryParam[]) =>
    electron.ipcRenderer.invoke('criaQueryParam', params),

  //Métodos para controle de resposta
  criaResposta: (resposta: Resposta) =>
    electron.ipcRenderer.invoke('criaResposta', resposta),
  atualizaResposta: (resposta: Resposta) =>
    electron.ipcRenderer.invoke('atualizaResposta', resposta),

  //Métodos para controle de coleções
  buscaColecoes: () => electron.ipcRenderer.invoke('buscaColecoes'),
  criaColecao: (colecao: Colecao) =>
    electron.ipcRenderer.invoke('criaColecao', colecao),
  atualizaColecao: (colecao: Colecao) =>
    electron.ipcRenderer.invoke('atualizaColecao', colecao),
  excluiColecao: (id: string) =>
    electron.ipcRenderer.invoke('excluiColecao', id),

  //Métodos para controle de pastas de coleções
  buscaPastasColecao: (colecao_id: string) =>
    electron.ipcRenderer.invoke('buscaPastasColecao', colecao_id),
  criaPastaColecao: (pasta: PastaColecao) =>
    electron.ipcRenderer.invoke('criaPastaColecao', pasta),
  atualizaPastaColecao: (pasta: PastaColecao) =>
    electron.ipcRenderer.invoke('atualizaPastaColecao', pasta),
  excluiPastaColecao: (id: string) =>
    electron.ipcRenderer.invoke('excluiPastaColecao', id),
});
