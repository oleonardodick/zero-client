import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import { isDev, trataMensagemErro } from './util.js';
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
import {
  AtualizaPastaColecao,
  BuscaPastasColecao,
  CriaPastaColecao,
  ExcluiPastaColecao,
} from './queries/pasta.js';
import { Colecao, PastaColecao } from '@prisma/client';

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

ipcMain.handle(
  'salvarJson',
  async (_, dadosJSON: object, nomeArquivo: string) => {
    const window = BrowserWindow.getFocusedWindow();
    if (window) {
      const { canceled, filePath } = await dialog.showSaveDialog(window, {
        title: 'Salvar arquivo',
        filters: [{ name: 'JSON Files', extensions: ['json'] }],
        defaultPath: `${nomeArquivo}.json`,
      });

      if (canceled || !filePath) return { success: false };
      try {
        fs.writeFileSync(filePath, JSON.stringify(dadosJSON, null, 2));
        return { success: true, filePath };
      } catch (error) {
        console.error('Erro ao salvar o arquivo: ', error);
        return { success: false, error: trataMensagemErro(error) };
      }
    }
  }
);

ipcMain.handle('importarJson', async () => {
  const window = BrowserWindow.getFocusedWindow();
  if (window) {
    const { canceled, filePaths } = await dialog.showOpenDialog(window, {
      title: 'Buscar arquivo',
      properties: ['openFile'],
      filters: [{ name: 'JSON Files', extensions: ['json'] }],
    });

    if (canceled || filePaths.length === 0) return { success: false };

    try {
      const filePath = filePaths[0];
      const content = fs.readFileSync(filePath, 'utf-8');
      const json = JSON.parse(content);

      if (
        typeof json === 'object' &&
        typeof json.nome === 'string' &&
        json.client === 'Zero Client'
      ) {
        const colecao: Colecao = {
          id: '',
          nome: json.nome,
        };
        const result = await CriaColecao(colecao);

        if (Array.isArray(json.pastas)) {
          const pastas: PastaColecao[] = json.pastas
            .filter((pasta: PastaColecao) => typeof pasta.nome === 'string')
            .map((pasta: PastaColecao) => ({
              nome: pasta.nome,
              colecao_id: result.idCriado,
            }));
          pastas.forEach((pasta) => {
            CriaPastaColecao(pasta);
          });
        }
        return { success: true };
      } else {
        return { success: false, error: 'Arquivo não suportado.' };
      }
    } catch (error) {
      console.error('Erro lendo o arquivo: ', error);
      return { success: false, error: trataMensagemErro(error) };
    }
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
