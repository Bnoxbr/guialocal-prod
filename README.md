# LocalGuia - Marketplace para Guias Turísticos

Um marketplace moderno para conectar turistas com guias locais certificados nas regiões da Serra da Mantiqueira e Sul de Minas Gerais.

## Características

- 🏔️ Busca de guias por localização, atividade e data
- 🧭 Perfis detalhados de guias com especialidades e avaliações
- 📅 Sistema de reservas com confirmação em tempo real
- 🔐 Autenticação de usuários (turistas e guias)
- 📱 Design responsivo para desktop e dispositivos móveis
- 🌐 Integração com Supabase para backend e autenticação

## Tecnologias

- React + TypeScript
- Vite
- Tailwind CSS
- Shadcn/UI
- Supabase (Autenticação, Banco de Dados, Storage)
- React Router

## Pré-requisitos

- Node.js 16+
- npm ou yarn
- Conta no Supabase

## Configuração

1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/localguia.git
cd localguia
```

2. Instale as dependências

```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
```

4. Execute o projeto em modo de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

## Estrutura do Projeto

```
src/
├── components/     # Componentes React
│   ├── ui/         # Componentes de UI (Shadcn)
│   ├── auth/       # Componentes de autenticação
│   └── dashboard/  # Componentes do painel de controle
├── lib/            # Utilitários e funções de API
├── types/          # Definições de tipos TypeScript
└── App.tsx         # Componente principal
```

## Configuração do Banco de Dados

O projeto utiliza Supabase como backend. As migrações do banco de dados estão localizadas em `supabase/migrations/`.

Para aplicar as migrações, execute:

```bash
npx supabase db push
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

