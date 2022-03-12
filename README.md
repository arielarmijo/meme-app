# MemeApp

Aplicación para crear memes usando la API de [ImgFlip](https://imgflip.com/api) y la autenticación de [Auth0](https://auth0.com/)


## Instalación

1. Clonar repositorio
```
git clone https://github.com/arielarmijo/meme-app.git
```

2. Ingresar a la carpeta meme-app
```
cd meme-app
```

3. Instalar dependencias
```
npm install
```

4. Crear un archivo secrets.json en la raíz del proyecto con la siguiente estructura
```
{
  "domain": "AUTH0_DOMAIN",
  "clientId": "AUTH0_CLIENT_ID",
  "imgFlipUsername": "IMG_FLIP_USERNAME",
  "imgFlipPassword": "IMG_FLIP_PASSWORD"
}
```

5. Iniciar el proyecto
```
ng serve --open
```