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
  BuscaUltimasRequisicoes,
  CriaRequisicao,
  ExcluiRequisicao,
} from './queries/requisicao.js';
import { AtualizaResposta, CriaResposta } from './queries/resposta.js';
import {
  AtualizaColecao,
  BuscaColecoes,
  CriaColecao,
  ExcluiColecao,
} from './queries/colecao.js';

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

ipcMain.handle('criaRequisicao', (_, requisicao) => {
  return CriaRequisicao(requisicao);
});

ipcMain.handle('atualizaRequisicao', (_, requisicao) => {
  return AtualizaRequisicao(requisicao);
});

ipcMain.handle('buscaUltimasRequisicoes', () => {
  return BuscaUltimasRequisicoes();
});

ipcMain.handle('buscaRequisicaoPorId', (_, id) => {
  return BuscaRequisicaoPorId(id);
});

ipcMain.handle('excluiRequisicao', (_, id) => {
  return ExcluiRequisicao(id);
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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
