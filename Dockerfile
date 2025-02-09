# Etapa 1: Construcción de la aplicación Angular
FROM node:14.21.3 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración
COPY package*.json ./

# Instala las dependencias
RUN npm install --legacy-peer-deps

# Copia el resto del código fuente
COPY . .

# Instala Angular CLI globalmente
RUN npm install -g @angular/cli@14.2.2

# Construye la aplicación en modo producción
RUN ng build --configuration production --verbose

# Etapa 2: Servidor Nginx para servir la aplicación
FROM nginx:alpine

# Copiar el archivo de configuración de Nginx personalizado
COPY default.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos desde la etapa de build
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 8080
EXPOSE 8080

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]

