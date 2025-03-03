# Estágio 1: Instalação de dependências
FROM node:22.8.0-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev  # Instala apenas dependências de produção

# Estágio 2: Build do projeto
FROM node:22.8.0-alpine AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm ci  # Instala todas as dependências (incluindo as de desenvolvimento)
RUN npm run build

# Estágio 3: Imagem final com Nginx
FROM nginx:alpine
COPY --from=build /app/deploy/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]