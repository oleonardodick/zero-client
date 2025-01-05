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
  criaRequisicao: (requisicao: any) =>
    electron.ipcRenderer.invoke('criaRequisicao', requisicao),
  buscaUltimasRequisicoes: () =>
    electron.ipcRenderer.invoke('buscaUltimasRequisicoes'),
});
