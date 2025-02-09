// export class HeaderDTO {
//   id: string;
//   header: string;
//   valor: string;
//   selecionado: boolean;

//   constructor(id: string, header: string, valor: string, selecionado: boolean) {
//     this.id = id;
//     this.header = header;
//     this.valor = valor;
//     this.selecionado = selecionado;
//   }
// }

export interface HeaderDTO {
  id: string;
  header: string;
  valor: string;
  selecionado: boolean;
  requisicao_id: string;
}
