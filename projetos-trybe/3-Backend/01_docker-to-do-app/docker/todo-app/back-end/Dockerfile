FROM node:14-alpine AS todobackend
WORKDIR /app
# A execução dos comandos será realizada no diretório "app", do container.
ADD node_modules.tar.gz .
# O comando ADD, nesse caso, descompacta a respectiva pasta e depois copiar os arquivos para container.
# Tais arquivos serão adicionados ao diretório "app", tendo em vista que o destino é "./".
COPY . .
# Copiando todos os arquivos da pasta "back-end" para o diretório "app" do container.
# Mesmo já tendo copiado os arquivos da pasta 'node_modules.tar.gz', podemos fazer o "COPY".
EXPOSE 3001
ENTRYPOINT ["npm", "start"]
# O comando "npm start" só será rodado quando o container for iniciado.