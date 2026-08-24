OVEJAS PUNK — WEB ESTÁTICA

ARCHIVOS
- index.html
- styles.css
- script.js
- assets/

QUÉ CAMBIAR PRIMERO
1) LOGO
   Reemplazá:
   assets/logo-ovejas-punk.svg
   por tu logo definitivo.

   Si el archivo se llama, por ejemplo:
   logo.png

   copiá logo.png dentro de /assets/ y en index.html buscá:
   src="assets/logo-ovejas-punk.svg"

   y cambialo por:
   src="assets/logo.png"

2) WHATSAPP / INSTAGRAM / MAIL
   Abrí script.js y editá el bloque SITE_CONFIG del principio.

3) GOOGLE FORMS
   Abrí Google Forms > Enviar > ícono "<>".
   Del iframe que te da Google copiá solamente el valor de src="...".
   Pegalo en script.js en:
   googleFormsUrl: "..."

4) PRODUCTOS
   En index.html buscá:
   <article class="product-card">
   Cada bloque completo representa un producto.

   Para cambiar el mensaje que llega a WhatsApp, cambiá:
   data-product="Nombre del producto"

5) FOTOS
   Las imágenes provisorias están en /assets/.
   Podés reemplazarlas por JPG, PNG, WEBP o SVG.
   Si cambiás el nombre del archivo, actualizá también el src en index.html.

FUNCIONES YA INCLUIDAS
- Web responsive.
- Logo giratorio permanente.
- Aceleración del logo al pasar y mover el mouse.
- Botones de consulta por WhatsApp.
- Animación de ovejas al tocar "Consultar".
- Contactos clickeables.
- Espacio preparado para Google Forms.
- Navegación por secciones.
