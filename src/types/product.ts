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
}

export interface ApiResponse {
  status: string;
  statusCode: number;
  formato: string;
  registros: {
    paginas: number;
    pagina_actual: number;
    total: number;
    limite: number;
    total_apresentados: number;
    codigoProduto: string;
    descricao: string;
    unidadeMedida: string;
    preco: string;
    categoria: string;
    ativo: string;
    produto_time: string;
  };
  url: string;
  mensagem: GasProduct[];
}
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
