# Season Fruits

Este proyecto es una aplicación web para consultar y mostrar información sobre frutas de temporada. Utiliza React y Vite para el desarrollo y construcción de la aplicación.

## Características

- Se adapta a múltiples dispositivos, brindando una buena experiencia de responsive.
- Se ha añadido un loading para mejorar la experiencia y usabilidad de la aplicación web.
- Se hace la lógica para hacer uso de las imágenes al momento de mostrar la información.
- Se permite hacer un filtrado de los resultados.
- Se le muestra al usuario cuántos resultados hay, cuántos se están listando y cuál es el parámetro de búsqueda.
- Si los resultados encontrados son igual a 0, se le comunica al usuario dicho estado.
- Se ha agregado el botón de "See More" que va aumentando de 4 en 4 los resultados.
- Se hace una validación en el tipo de dato cuando busca por texto, la cual se le indica al usuario cuando digita un número.
- Se guarda la información correspondiente en localStorage para la preservación de los datos en caso de que el usuario recargue la página.
- Se crea la información general mediante cards de información.
- El card de "Summary Information" se alimenta de las frutas que el usuario ha seleccionado, es decir, las que le ha dado me gusta.
- El card de "Summary Information" se le ha añadido un estilo en versión escritorio de posicionamiento específico para que, cuando el usuario genere scroll, le permita seguir viendo la información.
- Si el card de "Summary Information" no cuenta con datos, se le informa al usuario dicho estado y se le comunica qué es lo que debe hacer para utilizar esta característica.

## Versiones

- Node.js versión v22.2.0
- npm v10.7.0

## Instalación

1. Clona el repositorio:

- git clone git@github.com:DevAndreiP/retoBackbone.git 

2. Navega al directorio del proyecto:

- cd season-fruits

3. Instala las dependencias:

- npm install

## Uso

Para iniciar el servidor de desarrollo, ejecuta:

- npm run dev


## Dependencias
- React
- Vite
