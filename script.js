/* =========================================================
   OVEJAS PUNK - CONFIGURACIÓN
   CAMBIÁ SOLO ESTE BLOQUE cuando tengas tus datos definitivos.
   ========================================================= */

const SITE_CONFIG = {
  // WhatsApp: solo números, sin +, espacios ni guiones.
  // Ejemplo Argentina: 5491122334455
  whatsappNumber: "54911XXXXXXXX",

  // Texto visible en la tarjeta de contacto.
  whatsappLabel: "+54 9 11 XXXX XXXX",

  // Perfil completo de Instagram.
  instagramUrl: "https://www.instagram.com/ovejaspunk/",

  // Correo.
  email: "hola@ovejaspunk.com",

  /*
    GOOGLE FORMS
    En Google Forms:
    1) Abrí tu formulario.
    2) Tocá "Enviar".
    3) Elegí el ícono "<>" (Insertar HTML).
    4) Del código que te da Google, copiá SOLAMENTE el valor de src="...".
    5) Pegalo acá abajo.

    Ejemplo:
    googleFormsUrl: "https://docs.google.com/forms/d/e/XXXXXXXX/viewform?embedded=true"
  */
  googleFormsUrl: "REEMPLAZAR_CON_URL_EMBED_DE_GOOGLE_FORMS"
};


/* =========================================================
   LINKS DE CONTACTO
   ========================================================= */

function sanitizeWhatsappNumber(value) {
  return String(value || "").replace(/\D/g, "");
}

function whatsappIsConfigured() {
  const clean = sanitizeWhatsappNumber(SITE_CONFIG.whatsappNumber);
  return clean.length >= 8 && !String(SITE_CONFIG.whatsappNumber).includes("X");
}

function buildWhatsappUrl(productName = "") {
  if (!whatsappIsConfigured()) {
    return "#";
  }

  const clean = sanitizeWhatsappNumber(SITE_CONFIG.whatsappNumber);

  const message = productName
    ? `Hola Ovejas Punk, quiero consultar por: ${productName}.`
    : "Hola Ovejas Punk, quiero hacer una consulta.";

  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

function configureContactLinks() {
  const whatsapp = document.getElementById("contactWhatsapp");
  const instagram = document.getElementById("contactInstagram");
  const email = document.getElementById("contactEmail");
  const whatsappLabel = document.getElementById("whatsappLabel");

  whatsappLabel.textContent = SITE_CONFIG.whatsappLabel;

  if (whatsappIsConfigured()) {
    whatsapp.href = buildWhatsappUrl();
  } else {
    whatsapp.href = "#";
    whatsapp.addEventListener("click", (event) => {
      event.preventDefault();
      alert("Todavía falta configurar el número de WhatsApp en SITE_CONFIG dentro de script.js.");
    });
  }

  instagram.href = SITE_CONFIG.instagramUrl;
  email.href = `mailto:${SITE_CONFIG.email}`;

  const emailValue = email.querySelector(".contact-link-value");
  if (emailValue) {
    emailValue.textContent = SITE_CONFIG.email;
  }
}


/* =========================================================
   GOOGLE FORMS
   ========================================================= */

function configureGoogleForm() {
  const frame = document.getElementById("googleFormFrame");
  const placeholder = document.getElementById("formsPlaceholder");
  const url = String(SITE_CONFIG.googleFormsUrl || "").trim();

  const configured =
    url.startsWith("https://docs.google.com/forms/") &&
    !url.includes("REEMPLAZAR");

  if (!configured) {
    frame.hidden = true;
    placeholder.hidden = false;
    return;
  }

  frame.src = url;
  frame.hidden = false;
  placeholder.hidden = true;
}


/* =========================================================
   LOGO GIRATORIO
   - gira siempre lentamente
   - al pasar el mouse acelera
   - mover rápido el mouse le da "impulso"
   - al salir desacelera de manera progresiva
   ========================================================= */

function initLogoSpin() {
  const wrap = document.getElementById("rotatingLogoWrap");
  const logo = document.getElementById("rotatingLogo");

  if (!wrap || !logo) return;

  let angle = 0;
  let speed = 15;          // grados por segundo
  let targetSpeed = 15;
  let lastTime = performance.now();
  let lastPointerX = null;
  let lastPointerY = null;
  let lastPointerTime = null;

  const BASE_SPEED = 15;
  const HOVER_SPEED = 150;
  const MAX_SPEED = 520;

  wrap.addEventListener("pointerenter", () => {
    targetSpeed = HOVER_SPEED;
  });

  wrap.addEventListener("pointerleave", () => {
    targetSpeed = BASE_SPEED;
    lastPointerX = null;
    lastPointerY = null;
    lastPointerTime = null;
  });

  wrap.addEventListener("pointermove", (event) => {
    const now = performance.now();

    if (
      lastPointerX !== null &&
      lastPointerY !== null &&
      lastPointerTime !== null
    ) {
      const dx = event.clientX - lastPointerX;
      const dy = event.clientY - lastPointerY;
      const distance = Math.hypot(dx, dy);
      const elapsed = Math.max(8, now - lastPointerTime);

      // velocidad del puntero como impulso extra
      const pointerVelocity = (distance / elapsed) * 1000;
      const impulse = Math.min(300, pointerVelocity * 0.17);

      targetSpeed = Math.min(MAX_SPEED, HOVER_SPEED + impulse);
    }

    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
    lastPointerTime = now;
  });

  function animate(now) {
    const deltaSeconds = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;

    // suavizado de aceleración/desaceleración
    const easing = 1 - Math.pow(0.002, deltaSeconds);
    speed += (targetSpeed - speed) * easing;

    // si dejamos de mover el mouse, vuelve gradualmente a velocidad hover
    if (targetSpeed > HOVER_SPEED) {
      targetSpeed += (HOVER_SPEED - targetSpeed) * Math.min(1, deltaSeconds * 2.8);
    }

    angle = (angle + speed * deltaSeconds) % 360;
    logo.style.transform = `rotate(${angle}deg)`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}


/* =========================================================
   OVEJAS QUE SALEN DEL BOTÓN
   ========================================================= */

function makeSheepSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 120 82");
  svg.setAttribute("class", "running-sheep");

  svg.innerHTML = `
    <g stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M31 55 L25 74" fill="none"/>
      <path d="M54 56 L49 75" fill="none"/>
      <path d="M76 55 L82 74" fill="none"/>
      <path d="M90 52 L99 70" fill="none"/>

      <g fill="#f2efe7">
        <circle cx="36" cy="42" r="20"/>
        <circle cx="54" cy="34" r="22"/>
        <circle cx="73" cy="39" r="22"/>
        <circle cx="58" cy="49" r="24"/>
      </g>

      <path d="M89 32 C105 28 112 36 108 48 C105 58 93 61 83 53 C78 49 80 37 89 32 Z" fill="#111111"/>
      <circle cx="101" cy="39" r="2.8" fill="#f2efe7" stroke="none"/>
      <path d="M93 28 L91 17 L101 27 Z" fill="#111111"/>
      <path d="M106 30 L113 21 L111 34 Z" fill="#111111"/>

      <path d="M20 38 C8 32 7 21 15 17" fill="none"/>
    </g>
  `;

  return svg;
}

function launchSheepFromButton(button) {
  const layer = document.getElementById("sheepLayer");
  const rect = button.getBoundingClientRect();

  const centerX = rect.left + rect.width * 0.62;
  const centerY = rect.top + rect.height * 0.35;

  const count = 7;

  for (let i = 0; i < count; i++) {
    const sheep = makeSheepSvg();

    const spreadY = (Math.random() - 0.5) * 70;
    const startX = centerX - 40 + Math.random() * 30;
    const startY = centerY - 28 + spreadY;
    const duration = 720 + Math.random() * 480;
    const size = 54 + Math.random() * 46;
    const jump = 45 + Math.random() * 90;
    const endY = (Math.random() - 0.5) * 80;
    const rotStart = `${-10 + Math.random() * 20}deg`;
    const rotEnd = `${-12 + Math.random() * 24}deg`;

    sheep.style.setProperty("--start-x", `${startX}px`);
    sheep.style.setProperty("--start-y", `${startY}px`);
    sheep.style.setProperty("--sheep-duration", `${duration}ms`);
    sheep.style.setProperty("--sheep-size", `${size}px`);
    sheep.style.setProperty("--jump", `${jump}px`);
    sheep.style.setProperty("--end-y", `${endY}px`);
    sheep.style.setProperty("--rot-start", rotStart);
    sheep.style.setProperty("--rot-end", rotEnd);

    sheep.addEventListener("animationend", () => sheep.remove());
    layer.appendChild(sheep);
  }
}

function initConsultButtons() {
  const buttons = document.querySelectorAll(".consult-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = button.dataset.product || "un producto";

      launchSheepFromButton(button);

      if (!whatsappIsConfigured()) {
        window.setTimeout(() => {
          alert(
            "La animación ya funciona. Falta configurar el número de WhatsApp en SITE_CONFIG dentro de script.js."
          );
        }, 650);
        return;
      }

      const url = buildWhatsappUrl(product);

      // Dejamos ver la estampida antes de ir a WhatsApp.
      window.setTimeout(() => {
        window.location.href = url;
      }, 900);
    });
  });
}


/* =========================================================
   INICIO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  configureContactLinks();
  configureGoogleForm();
  initLogoSpin();
  initConsultButtons();
});
