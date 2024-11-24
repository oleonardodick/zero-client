import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  //métodos
});
