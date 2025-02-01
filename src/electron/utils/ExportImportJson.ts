import { JsonColecao, ResultExportImport } from '@shared/types';
import { BrowserWindow, dialog } from 'electron';
import { trataMensagemErro } from '../util.js';
import fs from 'fs';
import { Colecao, PastaColecao } from '@prisma/client';
import { CriaColecao } from '../queries/colecao.js';
import { CriaPastaColecao } from '../queries/pasta.js';

export const ExportarJson = async (
  json: JsonColecao,
  nomeArquivo: string
): Promise<ResultExportImport> => {
  const window = BrowserWindow.getFocusedWindow();
  if (!window) return { sucesso: false, erro: 'Erro inesperado.' };
  const { canceled, filePath } = await dialog.showSaveDialog(window, {
    title: 'Salvar arquivo',
    filters: [{ name: 'JSON Files', extensions: ['json'] }],
    defaultPath: `${nomeArquivo}.json`,
  });

  if (canceled) return { sucesso: true };
  if (!filePath) return { sucesso: false, erro: 'Arquivo não selecionado' };

  try {
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
    return { sucesso: true };
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};

export const ImportarJSON = async (): Promise<ResultExportImport> => {
  const window = BrowserWindow.getFocusedWindow();
  if (!window) return { sucesso: false, erro: 'Erro inesperado.' };

  const { canceled, filePaths } = await dialog.showOpenDialog(window, {
    title: 'Buscar arquivo',
    properties: ['openFile'],
    filters: [{ name: 'JSON Files', extensions: ['json'] }],
  });

  if (canceled) return { sucesso: true };

  if (filePaths.length === 0)
    return { sucesso: false, erro: 'Arquivo não selecionado' };

  try {
    const filePath = filePaths[0];
    const content = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(content) as JsonColecao;

    if (json.client === 'Zero Client') {
      const colecao: Colecao = json;
      const result = await CriaColecao(colecao);
      if (result.sucesso) {
        if (json.pastas && result.idCriado) {
          const idColecao = result.idCriado;
          const pastas: PastaColecao[] = json.pastas.map((pasta) => ({
            ...pasta,
            colecao_id: idColecao,
          }));
          pastas.forEach((pasta) => CriaPastaColecao(pasta));
        }
        return { sucesso: true };
      } else {
        return { sucesso: false, erro: result.erro };
      }
    } else {
      return { sucesso: false, erro: 'Arquivo não suportado.' };
    }
  } catch (erro) {
    return { sucesso: false, erro: trataMensagemErro(erro) };
  }
};
