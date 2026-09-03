OVEJAS PUNK — WEB FINAL

Esta versión recrea la estética del diseño aprobado:
- Fondo negro / carbón.
- Crema.
- Rosa fuerte.
- Amarillo ácido.
- Collage, cintas, papeles, ilustraciones y textura.
- OVEJA BLANCA como identidad principal en header y hero.

ARCHIVOS
- index.html
- styles.css
- script.js
- assets/

============================================================
1. CONFIGURAR WHATSAPP
============================================================

Abrí script.js.

Arriba de todo:

const SITE_CONFIG = {
    whatsappNumber: "54911XXXXXXXX",
    whatsappLabel: "+54 9 11 XXXX XXXX",
    googleFormsUrl: "REEMPLAZAR_CON_URL_EMBED_DE_GOOGLE_FORMS"
};

Cuando tengas el número real, por ejemplo:

whatsappNumber: "5491122334455"

IMPORTANTE:
- sin +
- sin espacios
- sin guiones

whatsappLabel es solamente el texto que se muestra.

Todos los botones de consulta/contacto están centralizados en
esa única configuración.

Los links de NOSOTROS / PRODUCTOS / CONTACTO del menú son
navegación interna de la misma página.

============================================================
2. GOOGLE FORMS
============================================================

En Google Forms:
1. Abrí tu formulario.
2. Elegí "Enviar".
3. Elegí el icono "<>".
4. Google mostrará un iframe.
5. Copiá solamente el contenido de src="...".

Ejemplo:

https://docs.google.com/forms/d/e/XXXXXXXX/viewform?embedded=true

Pegalo en script.js:

googleFormsUrl:
"https://docs.google.com/forms/d/e/XXXXXXXX/viewform?embedded=true"

No hace falta modificar index.html.

============================================================
3. INTERACCIONES
============================================================

La oveja blanca grande del inicio:
- gira lentamente sola;
- acelera al pasar el mouse;
- mover rápido el mouse le da impulso;
- se puede tocar;
- se puede arrastrar;
- Enter o espacio también le da impulso.

Tarjetas:
- reaccionan al hover;
- reaccionan al toque;
- las imágenes se mueven suavemente.

Botones CONSULTAR:
- generan una estampida lenta de ovejas;
- esperan para que la animación se vea;
- luego abren WhatsApp.

============================================================
4. PRODUCTOS
============================================================

Los productos se editan en index.html.

Cada tarjeta es:

<article class="product-card">

El mensaje de WhatsApp está en:

data-message="..."

Ejemplo:

data-message="Hola Ovejas Punk, quiero consultar por Cámaras."

============================================================
5. RESPONSIVE
============================================================

Incluye:
- escritorio;
- tablet;
- celular;
- menú móvil;
- tarjetas que pasan de 5 a 3, 2 y 1 columnas;
- hero reacomodado;
- Google Forms responsive.
