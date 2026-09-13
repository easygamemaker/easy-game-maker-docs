# Deploy no Netlify

O workflow `.github/workflows/deploy-netlify.yml` executa lint, build e deploy de producao no Netlify a cada push em `main`. O arquivo `netlify.toml` publica `dist/` e redireciona rotas para `index.html`, necessario para o `BrowserRouter`.

## Secrets necessarios

Crie os secrets em `Settings > Secrets and variables > Actions` do repositorio GitHub.

1. `NETLIFY_AUTH_TOKEN`: crie um token de acesso pessoal no Netlify em `User settings > Applications > Personal access tokens`.
2. `NETLIFY_SITE_ID`: copie o identificador do site em `Site configuration > General > Site details > Site ID`.

O token deve pertencer a uma conta com permissao de deploy no site. Prefira uma conta de automacao do time em vez de um token pessoal de uso diario.

## Configuracao inicial

1. Crie o site no Netlify ou selecione um site existente.
2. Informe `NETLIFY_AUTH_TOKEN` e `NETLIFY_SITE_ID` como secrets do GitHub.
3. Envie um commit para `main` ou execute o workflow manualmente em `Actions > Deploy documentation to Netlify`.
4. Confirme o endereco de publicacao informado na etapa de deploy.

O deploy e de producao. Pull requests nao sao publicados por esse workflow.
