# Criando uma imagem com base na imagem compactada (alpine) do node, na versão 16.
FROM node:16-alpine
# Criará um diretório "app" no container e entrará nele (mkdir app + cd app).
WORKDIR /app
# Copiará os arquivos package.json e package-lock.json, contidos em /src, para dentro do workdir do container.
COPY package* ./
# Instalando as dependências do projeto.
RUN npm install
# Copiando, para dentro do workdir, todos os arquivos e diretórios contidos dentro da mesma pasta em que esse Dockerfile está presente.
COPY . .
# Definindo o número da porta interna do container.
EXPOSE 3001
# Comando responsável por iniciar o back, dentro do container.
# Utilizou-se ENTRYPOINT pois deseja-se que o comando "npm start" seja fixo.
ENTRYPOINT ["npm", "start"]