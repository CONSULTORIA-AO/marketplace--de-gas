// ── Item de pedido ──────────────────────────────────────────────
export interface ItemPedido {
  id_itens_pedido: number;
  produto_id: number;
  quantidade: number;
  preco_unitario: number;
  preco_total: number;
}

// ── Pedido completo (retornado pela API) ─────────────────────────
export interface Pedido {
  pedidoCotacaoId: number;
  numero_cotacao: string;
  clienteIdPedido: number;
  statusPedido: StatusPedidoAPI;
  pedido_time: string; // ISO date — data prevista/agendada
  pedido_update: string; // ISO date — última atualização
  nomeCliente: string;
  emailCliente: string;
  fotoCliente: string;
  telefoneCliente: string;
  telefoneClienteAlt: string;
  criado_em: string; // ISO date — data de criação
  actualizado_em: string; // ISO date — data de atualização
  itens: ItemPedido[];
}

// ── Status possíveis vindos da API ───────────────────────────────
export type StatusPedidoAPI =
  | 'Pendente'
  | 'Processando'
  | 'A Caminho'
  | 'Entregue'
  | 'Cancelado';

// ── Paginação ────────────────────────────────────────────────────
export interface RegistrosPaginacao {
  paginas: number;
  pagina_actual: number;
  total: number;
  limite: number;
  total_apresentados: number;
  numero_cotacao: string;
  statusPedido: string;
  pedido_time: string;
}

// ── Resposta: lista de pedidos (GET /v1/pedidos) ─────────────────
export interface RespostaListaPedidos {
  status: string;
  statusCode: number;
  formato: string;
  registros: RegistrosPaginacao;
  url: string;
  mensagem: Pedido[];
}

// ── Resposta: pedido por ID (GET /v1/pedidos/:id) ────────────────
export interface RespostaPedidoPorId {
  status: string;
  statusCode: number;
  formato: string;
  mensagem: Pedido;
}

// ── Resposta: pedidos por cliente (GET /v1/pedidos/cliente/:id) ──
export interface RespostaPedidosPorCliente {
  status: string;
  statusCode: number;
  formato: string;
  registros: RegistrosPaginacao;
  url: string;
  mensagem: Pedido[];
}

// ── Config visual por status ──────────────────────────────────────
export interface StatusConfig {
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: string;
  step: number;
}

export const STATUS_CONFIG: Record<StatusPedidoAPI, StatusConfig> = {
  Pendente: {
    label: 'Pendente',
    color: 'rgba(255,255,255,0.55)',
    bg: 'rgba(255,255,255,0.05)',
    border: 'rgba(255,255,255,0.15)',
    icon: 'schedule',
    step: 0,
  },
  Processando: {
    label: 'Processando',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.1)',
    border: 'rgba(251,191,36,0.3)',
    icon: 'autorenew',
    step: 1,
  },
  'A Caminho': {
    label: 'A Caminho',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.1)',
    border: 'rgba(96,165,250,0.3)',
    icon: 'local_shipping',
    step: 2,
  },
  Entregue: {
    label: 'Entregue',
    color: '#4ade80',
    bg: 'rgba(74,222,128,0.1)',
    border: 'rgba(74,222,128,0.3)',
    icon: 'check_circle',
    step: 3,
  },
  Cancelado: {
    label: 'Cancelado',
    color: '#f87171',
    bg: 'rgba(248,113,113,0.1)',
    border: 'rgba(248,113,113,0.3)',
    icon: 'cancel',
    step: -1,
  },
};

// ── Helpers ───────────────────────────────────────────────────────

/** Soma todos os itens do pedido */
export function calcularTotalPedido(itens: ItemPedido[]): number {
  return itens.reduce((acc, item) => acc + item.preco_total, 0);
}

/** Formata data ISO para pt-BR legível */
export function formatarData(iso: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/** Formata data ISO com hora */
export function formatarDataHora(iso: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export interface PedidoItem {
  id_itens_pedido: number;
  produto_id: number;
  quantidade: number;
  preco_unitario: number;
  preco_total: number;
}

export interface Pedido {
  pedidoCotacaoId: number;
  clienteIdPedido: number;
  numero_cotacao: string;
  statusPedido: StatusPedidoAPI;
  pedido_time: string;
  pedido_update: string;

  nomeCliente: string;
  emailCliente: string;
  fotoCliente: string;

  telefoneCliente: string;
  telefoneClienteAlt: string;

  criado_em: string;
  actualizado_em: string;

  itens: PedidoItem[];
}

export interface PedidoRegistros {
  paginas: number;
  pagina_actual: number;
  total: number;
  limite: number;
  total_apresentados: number;

  numero_cotacao: string;
  statusPedido: string;
  pedido_time: string;
}

export interface PedidosResponse {
  status: string;
  statusCode: number;
  formato: string;

  registros: PedidoRegistros;

  url: string;

  mensagem: Pedido[];
}
