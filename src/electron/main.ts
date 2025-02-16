import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { isDev } from './util.js';
import { getPreloadPath } from './pathResolver.js';
import {
  atualizaValorVariavelAmbiente,
  buscaTodasVariaveisAmbiente,
  criaVariavelAmbiente,
  excluiVariavelAmbiente,
} from './queries/variavelAmbiente.js';
import {
  AtualizaRequisicao,
  BuscaRequisicaoPorId,
  BuscaRequisicoesColecao,
  BuscaRequisicoesPasta,
  BuscaUltimasRequisicoes,
  CriaRequisicao,
  ExcluiRequisicao,
} from './queries/requisicao.js';
import {
  AtualizaResposta,
  BuscaRespostaDaRequisicao,
  CriaResposta,
} from './queries/resposta.js';
import {
  AtualizaColecao,
  BuscaColecoes,
  CriaColecao,
  ExcluiColecao,
} from './queries/colecao.js';
import {
  AtualizaPastaColecao,
  BuscaPastasColecao,
  CriaPastaColecao,
  ExcluiPastaColecao,
} from './queries/pasta.js';
import {
  BuscaAutenticacaoDaRequisicao,
  CriaAutenticacao,
  CriaAutenticacaoBasic,
  CriaAutenticacaoBearer,
} from './queries/autenticacao.js';
import { BuscaHeadersDaRequisicao, CriaHeader } from './queries/header.js';
import {
  BuscaQueryParamsDaRequisicao,
  CriaQueryParam,
} from './queries/queryParam.js';
import { ExportarJson, ImportarJSON } from './utils/ExportImportJson.js';

let mainWindow: BrowserWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: getPreloadPath(),
    },
  });
  mainWindow.maximize();
  mainWindow.show();
  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
  }
});

ipcMain.handle('exportarJson', async (_, dadosJSON, nomeArquivo) => {
  return ExportarJson(dadosJSON, nomeArquivo);
});

ipcMain.handle('importarJson', async () => {
  return ImportarJSON();
});

ipcMain.handle('buscaTodasVariaveisAmbiente', () => {
  return buscaTodasVariaveisAmbiente();
});

ipcMain.handle('criaVariavelAmbiente', (_, nome, valor) => {
  return criaVariavelAmbiente(nome, valor);
});

ipcMain.handle('atualizaVariavelAmbiente', (_, nome, valor) => {
  return atualizaValorVariavelAmbiente(nome, valor);
});

ipcMain.handle('excluiVariavelAmbiente', (_, nome) => {
  return excluiVariavelAmbiente(nome);
});

ipcMain.handle('buscaRequisicaoPorId', (_, id) => {
  return BuscaRequisicaoPorId(id);
});

ipcMain.handle('buscaRequisicoesColecao', (_, colecao_id) => {
  return BuscaRequisicoesColecao(colecao_id);
});

ipcMain.handle('buscaRequisicoesPasta', (_, pasta_id) => {
  return BuscaRequisicoesPasta(pasta_id);
});

ipcMain.handle('buscaUltimasRequisicoes', () => {
  return BuscaUltimasRequisicoes();
});

ipcMain.handle('criaRequisicao', (_, requisicao) => {
  return CriaRequisicao(requisicao);
});

ipcMain.handle('atualizaRequisicao', (_, requisicao, id) => {
  return AtualizaRequisicao(requisicao, id);
});

ipcMain.handle('excluiRequisicao', (_, id) => {
  return ExcluiRequisicao(id);
});

ipcMain.handle('buscaAutenticacaoDaRequisicao', (_, requisicao_id) => {
  return BuscaAutenticacaoDaRequisicao(requisicao_id);
});

ipcMain.handle('criaAutenticacao', (_, autenticacao) => {
  return CriaAutenticacao(autenticacao);
});

ipcMain.handle('criaAutenticacaoBasic', (_, basic) => {
  return CriaAutenticacaoBasic(basic);
});

ipcMain.handle('criaAutenticacaoBearer', (_, bearer) => {
  return CriaAutenticacaoBearer(bearer);
});

ipcMain.handle('buscaHeadersDaRequisicao', (_, requisicao_id) => {
  return BuscaHeadersDaRequisicao(requisicao_id);
});

ipcMain.handle('criaHeader', (_, header) => {
  return CriaHeader(header);
});

ipcMain.handle('buscaQueryParamsDaRequisicao', (_, id_requisicao) => {
  return BuscaQueryParamsDaRequisicao(id_requisicao);
});

ipcMain.handle('criaQueryParam', (_, param) => {
  return CriaQueryParam(param);
});

ipcMain.handle('buscaRespostaDaRequisicao', (_, requisicao_id) => {
  return BuscaRespostaDaRequisicao(requisicao_id);
});

ipcMain.handle('criaResposta', (_, resposta, requisicao_id) => {
  return CriaResposta(resposta, requisicao_id);
});

ipcMain.handle('atualizaResposta', (_, resposta, requisicao_id) => {
  return AtualizaResposta(resposta, requisicao_id);
});

ipcMain.handle('buscaColecoes', () => {
  return BuscaColecoes();
});

ipcMain.handle('criaColecao', (_, colecao) => {
  return CriaColecao(colecao);
});

ipcMain.handle('atualizaColecao', (_, colecao) => {
  return AtualizaColecao(colecao);
});

ipcMain.handle('excluiColecao', (_, id) => {
  return ExcluiColecao(id);
});

ipcMain.handle('buscaPastasColecao', (_, colecao_id) => {
  return BuscaPastasColecao(colecao_id);
});

ipcMain.handle('criaPastaColecao', (_, pasta) => {
  return CriaPastaColecao(pasta);
});

ipcMain.handle('atualizaPastaColecao', (_, pasta) => {
  return AtualizaPastaColecao(pasta);
});

ipcMain.handle('excluiPastaColecao', (_, id) => {
  return ExcluiPastaColecao(id);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
