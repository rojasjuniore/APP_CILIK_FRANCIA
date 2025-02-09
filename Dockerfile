# Etapa 1: Construcción de la aplicación Angular
FROM node:lts-bullseye AS build

# Establece el directorio de trabajo
WORKDIR /app


# Copia solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala una versión específica de @angular/cli
RUN npm install -g @angular/cli@14.2.1

# Instala las dependencias necesarias
RUN npm install --legacy-peer-deps --no-audit --no-fund

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación en modo producción
RUN npm run build

# Etapa de producción
FROM nginx:alpine AS prod

# Copiar el archivo de configuración de Nginx personalizado
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para servir la aplicación
EXPOSE 8080

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]

