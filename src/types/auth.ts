export interface AuthResponse {
  status: string;
  statusCode: number;
  formato: string;

  info: {
    id_conf: number;
    clienteIdConf: string;
    tentativas_login: number;
    codigo_seguranca: string;
    codigo_confirmacao: string;
    tempo_de_vida_codigo_seguranca: string;
    servico_mensagens: string;
    servico_email: string;
    servico_principal: string;
  };

  mensagem: {
    text: string;
    hash: string;
    ultimo_login: string;
    novo_cliente: string;
    entidade: number;
  };
}

export interface AuthInfo {
  id_conf: number;
  clienteIdConf: string;
  tentativas_login: number;
  codigo_seguranca: string;
  codigo_confirmacao: string;
  tempo_de_vida_codigo_seguranca: string;
  servico_mensagens: string;
  servico_email: string;
  servico_principal: string;
}

export interface AuthMensagem {
  text: string;
  hash: string;
  ultimo_login: string;
  novo_cliente: string;
  entidade: number;
}

export interface AuthUser {
  id: number;
  ultimoLogin: string;
  novoCliente: boolean;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
  info: AuthInfo;
}
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  email: string;
}
