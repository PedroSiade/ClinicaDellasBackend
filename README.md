# Clínica Dellas - Backend

API RESTful construída com Express.js e TypeScript para sistema de gestão de clínica médica.

## Sobre o Projeto

Backend completo para clínica médica com:

- Sistema de autenticação JWT
- Gestão de profissionais
- Catálogo de serviços
- Sistema de blog
- Upload de imagens
- Arquitetura limpa baseada em SOLID

## Stack Tecnológica

- Express.js - Framework web
- TypeScript - Tipagem estática
- Prisma ORM - Integração com banco de dados
- PostgreSQL - Banco de dados (Supabase)
- JWT - Autenticação
- BCrypt - Hash de senhas
- Multer - Upload de arquivos
- Zod - Validação de dados

## Instalação e Execução

### Pré-requisitos
- Node.js v18+
- PostgreSQL ou Supabase
- NPM

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/clinica-dellas-backend.git

# Acesse o diretório
cd clinica-dellas-backend

# Instale as dependências
npm install
```

### Configuração
Crie o arquivo `.env`:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/clinica_dellas"
JWT_SECRET="sua-chave-jwt-segura"
PORT=5000
NODE_ENV=development
UPLOAD_PATH="./uploads"

# Para Supabase
SUPABASE_URL="https://sua-url.supabase.co"
SUPABASE_ANON_KEY="sua-chave-anonima"
```

### Execução
```bash
# Gerar cliente Prisma
npm run prisma:generate

# Aplicar migrações
npm run prisma:migrate

# Popular banco de dados
npm run seed

# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## Estrutura do Projeto

```
src/
├── controllers/              # Controladores HTTP
│   ├── authController.ts     # Autenticação
│   ├── professionalController.ts # Profissionais
│   ├── serviceController.ts  # Serviços
│   └── postController.ts     # Blog
├── routes/                   # Rotas da API
├── usecases/                 # Lógica de negócios
├── middlewares/              # Middlewares customizados
├── prisma/                   # Configuração Prisma
│   ├── schema.prisma         # Esquema do banco
│   └── migrations/           # Migrações
└── utils/                    # Utilitários
```

## API Endpoints

### Autenticação
```
POST /auth/login      # Login
POST /auth/register   # Registro
```

Para outros endpoints consultar documentação do Postman. Todas as rotas necessitam autenticação, exceto os GETs públicos.

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build
npm start

# Prisma
npm run prisma:generate    # Gerar cliente
npm run prisma:migrate     # Aplicar migrações
npm run prisma:studio      # Interface visual
npm run prisma:reset       # Resetar banco

# Dados iniciais
npm run seed
```

## Segurança

- Senhas hasheadas com BCrypt
- Autenticação JWT
- Middleware de autorização
- Validação de dados com Zod
- Sanitização de inputs

## Arquitetura

O projeto segue os princípios SOLID com separação em camadas:

- **Routes**: Mapeamento de endpoints
- **Controllers**: Lógica HTTP
- **UseCases**: Regras de negócio
- **Middlewares**: Interceptadores
- **Prisma**: Camada de dados

## Deploy

A aplicação está configurada para deploy em serviços como Heroku, Railway ou DigitalOcean.

## Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.