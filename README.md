# 🔥 GasMarket - Marketplace de Gás

Um marketplace moderno e completo para venda de gás, desenvolvido com as melhores tecnologias do ecossistema React.

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool ultrarrápido
- **React Router DOM** - Roteamento de páginas
- **TanStack React Query** - Gerenciamento de estado servidor
- **Zustand** - Gerenciamento de estado global
- **Axios** - Cliente HTTP para requisições
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Componentes UI modernos e acessíveis

## ✨ Funcionalidades Implementadas

### 🔐 Autenticação
### 👤 Perfil do Usuário
### 🛒 Carrinho de Compras
### 📦 Produtos
### 💳 Checkout
### 📋 Pedidos
### ⭐ Avaliações
### 📍 Endereços

## 📁 Estrutura do Projeto

```
gas-marketplace/
├── src/
│   ├── components/
│   │   ├── ui/              # Componentes shadcn/ui
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ...
│   │   └── layout/          # Componentes de layout
│   │       └── Header.tsx
│   ├── pages/               # Páginas da aplicação
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── OrdersPage.tsx
│   │   └── ...
│   ├── store/               # Stores Zustand
│   │   ├── authStore.ts
│   │   └── cartStore.ts
│   ├── lib/                 # Utilitários e configurações
│   │   ├── axios.ts
│   │   ├── utils.ts
│   │   └── validations.ts
│   ├── types/               # Tipos TypeScript
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎨 Conceitos de Componentização

O projeto segue as melhores práticas de componentização do React:

### 1. **Componentes Reutilizáveis**
- Todos os componentes UI são isolados e reutilizáveis
- Uso do shadcn/ui para componentes base consistentes

### 2. **Separação de Responsabilidades**
- Componentes de UI em `components/ui/`
- Componentes de layout em `components/layout/`
- Páginas em `pages/`

### 3. **Composição**
- Componentes pequenos e focados
- Composição de componentes complexos a partir de componentes simples

### 4. **Props Tipadas**
- Uso extensivo de TypeScript para tipar props
- Interfaces bem definidas 

### 5. ** Validações**
- Uso extensivo de Zod para tipar e validar formulários
- Interfaces bem definidas 

### 6. **Custom Hooks**
- `useToast` para notificações
- Stores Zustand para estado global

## 🔧 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

1. Clone o repositório ou extraia o arquivo

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (opcional):
```bash
# Crie um arquivo .env na raiz do projeto
VITE_API_URL=http://localhost:3000/api
```

4. Execute o projeto em modo desenvolvimento:
```bash
npm run dev
```

5. Acesse no navegador:
```
http://localhost:8080
```

### Build para Produção

```bash
npm run build
```

O build será gerado na pasta `dist/`

## 🌐 API Backend

Este projeto está preparado para consumir uma API REST. Configure a URL base da API no arquivo `.env`:

```
VITE_API_URL=https://sua-api.com/api
```

### Endpoints Esperados

```
POST   /auth/register       - Cadastro de usuário
POST   /auth/login          - Login
POST   /auth/reset-password - Recuperação de senha
POST   /auth/activate       - Ativação de conta

GET    /products            - Lista de produtos
GET    /products/:id        - Detalhes do produto

GET    /addresses           - Lista de endereços do usuário
POST   /addresses           - Criar endereço
PUT    /addresses/:id       - Atualizar endereço
DELETE /addresses/:id       - Deletar endereço

GET    /orders              - Lista de pedidos do usuário
POST   /orders              - Criar pedido
GET    /orders/:id          - Detalhes do pedido

POST   /reviews             - Criar avaliação
```

## 🎯 Funcionalidades Futuras

- [ ]

## 🛠️ Customização

### Cores do Tema
Edite o arquivo `tailwind.config.js` e `src/index.css` para customizar as cores:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... outras cores */
}
```

### Componentes UI
Todos os componentes shadcn/ui podem ser customizados em `src/components/ui/`

## 📝 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
npm run lint     # Executa o linter
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Desenvolvedor

nome:Romeu Cajamba 
e-mail:romeucajamba@gmail.com
github:[text](https://github.com/romeucajamba)

---