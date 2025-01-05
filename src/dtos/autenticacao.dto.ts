export class AutenticacaoDTO {
  tipo: string;
  bearer?: Bearer | null;
  basic?: Basic | null;

  constructor(tipo: string, bearer?: Bearer, basic?: Basic) {
    this.tipo = tipo;
    this.bearer = bearer;
    this.basic = basic;
  }
}

export class Bearer {
  prefix: string;
  token: string;

  constructor(prefix: string, token: string) {
    this.prefix = prefix;
    this.token = token;
  }
}

export class Basic {
  usuario: string;
  senha: string;

  constructor(usuario: string, senha: string) {
    this.usuario = usuario;
    this.senha = senha;
  }
}
