export interface Seller {
  empresaId: number;
  nomeEmpresa: string;
  endereco_mac_unico_empresa: string;
  nif: string;
  enderecoEmpresa: string;
  cidade: string;
  provincia: string;
  emailEmpresa: string;
  senhaEmpresa: string;
  logoEmpresa: string;
  telefoneEmpresa: string;
  telefoneEmpresaAlt: string;
  responsavel: string;
  entidadePagamentoEMIS: string;
  bloqueioEmpresa: string;
  nova_empresa: string;
  ultimo_login: string;
  empresa_time: string;
  empresa_update: string;
}

export interface GasProduct {
  produtoId: number;
  empresaDona: number;
  imagem_produto: string;
  descricao: string;
  unidadeMedida: string;
  preco: number;
  ativo: string;
  produto_time: string;
  produto_update: string;
  vendedor?: Seller; // ✅ vendedor pode não vir no array de listagem
}

// Resposta da lista de produtos
export interface ApiProductResponse {
  status: string;
  statusCode: number;
  formato: string;
  registros: {
    paginas: number;
    pagina_actual: number;
    total: number;
    limite: number;
    total_apresentados: number;
  };
  mensagem: GasProduct[];
}

// Resposta de produto por ID
export interface ApiProductByIdResponse {
  status: string;
  statusCode: number;
  formato: string;
  mensagem: GasProduct;
}
