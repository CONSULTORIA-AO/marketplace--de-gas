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

export interface Cliente {
  clienteId: number;
  enderecoCliente: string;
  endereco_mac_unico: string;
  arquivoIdentificacao: string | null;
  bloqueio: string;
  nomeCliente: string;
  responsavel: string | null;
  emailCliente: string;
  fotoCliente: string;
  telefoneCliente: string;
  telefoneClienteAlt: string;
  referenciaEMIS: string;
  criado_em: string;
  actualizado_em: string;
  observacoes: string | null;
  ultimo_login: string;
  novo_cliente: string;
  id_conf: number;
  clienteIdConf: string;
  tentativas_login: number;
  codigo_seguranca: string;
  codigo_confirmacao: string;
  tempo_de_vida_codigo_seguranca: string;
  servico_mensagens: string;
  servico_email: string;
  servico_principal: string;
  config_time: string;
  config_update: string;
}
