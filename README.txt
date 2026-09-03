OVEJAS PUNK — WEB V4

CAMBIOS DE ESTA VERSION
-----------------------
- Logo de WhatsApp real en header, contacto, footer y botón flotante.
- Logo del header más grande.
- El título principal OVEJAS PUNK usa el vector/tipografía del logo original.
- Oveja del botón CONSULTAR más grande.
- Texto amarillo:
  PENSÁ. ALQUILÁ. GRABÁ.
  NOSOTROS PONEMOS EL EQUIPO.
- Nueva descripción principal de alquiler de sonido.
- Banner rosa actualizado:
  corbateros / shotguns / micrófonos inalámbricos /
  grabadoras portátiles / heno ties / meeeeh 🐑
- Rayas del collage subidas.
- Flecha del collage apunta hacia arriba.
- "Sobre nosotros" reemplazado por "Cómo alquilar".
- Se agregó el procedimiento de reserva y pago.
- "Productos" reemplazado por "Equipos".
- Se cargaron los 10 equipos solicitados.
- Nuevo texto de contacto.
- Logos de WhatsApp e Instagram.
- Responsive completo.
- Oveja principal interactiva.
- Animación lenta de ovejas en botones CONSULTAR.

============================================================
CONFIGURAR WHATSAPP
============================================================

Abrir:
script.js

Al principio:

const SITE_CONFIG = {
  whatsappNumber: "54911XXXXXXXX",
  whatsappLabel: "+54 9 11 XXXX XXXX",
  instagramUrl: "https://www.instagram.com/ovejaspunk/",
  instagramLabel: "@ovejaspunk",
  googleFormsUrl: "REEMPLAZAR_CON_URL_EMBED_DE_GOOGLE_FORMS"
};

Ejemplo de WhatsApp:

whatsappNumber: "5491122334455"

IMPORTANTE:
- sin +
- sin espacios
- sin guiones

============================================================
CONFIGURAR INSTAGRAM
============================================================

Cambiar:

instagramUrl:
"https://www.instagram.com/ovejaspunk/"

instagramLabel:
"@ovejaspunk"

============================================================
CONFIGURAR GOOGLE FORMS
============================================================

1. Abrir Google Forms.
2. Enviar.
3. Elegir <> Insertar HTML.
4. Copiar solamente el src del iframe.

Ejemplo:

https://docs.google.com/forms/d/e/XXXXXXXX/viewform?embedded=true

Pegar en:

googleFormsUrl:
"https://docs.google.com/forms/d/e/XXXXXXXX/viewform?embedded=true"

No hace falta tocar index.html.

============================================================
EQUIPOS
============================================================

Se cargaron:

1. Zoom H6 Essential
2. Sennheiser MKE 600
3. Sony ECM-W3
4. Sennheiser G4
5. Cable XLR — 2 m
6. Cable XLR — 6 m
7. Faja de cadera
8. Faja de muslo
9. Faja de tobillo
10. Bongo Ties — 15 unidades de 10 cm

Cada botón CONSULTAR tiene su propio mensaje de WhatsApp.

============================================================
INTERACCIONES
============================================================

OVEJA PRINCIPAL
- gira sola;
- acelera al pasar el mouse;
- recibe impulso al mover el mouse;
- se puede arrastrar;
- se puede tocar en celular;
- Enter y espacio también le dan impulso.

CONSULTAR
- genera ovejas caminando lentamente;
- después abre WhatsApp.

RESPONSIVE
- desktop;
- tablet;
- celular;
- menú móvil;
- grilla de equipos adaptable.
