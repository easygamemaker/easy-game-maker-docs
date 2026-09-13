# Deploy no Netlify

O Netlify esta conectado diretamente ao repositorio GitHub. Cada push na branch `main` gera um deploy de producao sem secrets nem workflow no GitHub.

O arquivo `netlify.toml` define o comando `npm run build`, publica `dist/` e redireciona rotas para `index.html`, necessario para o `BrowserRouter`.

## Configuracao no Netlify

1. Branch de producao: `main`.
2. Comando de build: `npm run build`.
3. Diretorio publicado: `dist`.
4. Versao do Node.js: `22`.

O GitHub Actions nao faz deploy deste portal. Pull requests tambem nao sao publicados automaticamente.
