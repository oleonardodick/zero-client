const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
  getVariaveisAmbiente: () => console.log('buscando variaveis'),
});
