/* =========================================================
   OVEJAS PUNK — CONFIGURACIÓN
   Cambiá este bloque y no hace falta tocar el resto.
   ========================================================= */

const SITE_CONFIG = {
  /*
    WHATSAPP
    Usar SOLO números: sin +, espacios ni guiones.

    Ejemplo Argentina:
    5491122334455
  */
  whatsappNumber: "54911XXXXXXXX",

  // Es únicamente el texto visible en la web.
  whatsappLabel: "+54 9 11 XXXX XXXX",

  // Instagram: cambiar link y texto acá.
  instagramUrl: "https://www.instagram.com/ovejaspunk/",
  instagramLabel: "@ovejaspunk",

  /*
    GOOGLE FORMS
    En tu formulario:
    Enviar > <> Insertar HTML

    Google te da algo como:
    <iframe src="https://docs.google.com/forms/d/e/XXXXX/viewform?embedded=true">

    Copiá solamente el contenido de src="..." y pegalo acá.
  */
  googleFormsUrl: "REEMPLAZAR_CON_URL_EMBED_DE_GOOGLE_FORMS"
};


/* =========================================================
   WHATSAPP
   ========================================================= */

function cleanWhatsappNumber(value) {
  return String(value || "").replace(/\D/g, "");
}

function isWhatsappConfigured() {
  const raw = String(SITE_CONFIG.whatsappNumber || "");
  const clean = cleanWhatsappNumber(raw);

  return clean.length >= 8 && !raw.includes("X");
}

function getWhatsappUrl(message) {
  if (!isWhatsappConfigured()) {
    return null;
  }

  const number = cleanWhatsappNumber(SITE_CONFIG.whatsappNumber);

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function openWhatsapp(message) {
  const url = getWhatsappUrl(message);

  if (!url) {
    alert(
      "WhatsApp está preparado, pero todavía falta cargar el número real. " +
      "Abrí script.js y reemplazá whatsappNumber en SITE_CONFIG."
    );
    return;
  }

  window.location.href = url;
}




/* =========================================================
   INSTAGRAM
   ========================================================= */

function setupInstagram() {
  const link = document.getElementById("instagramLink");
  const label = document.getElementById("instagramVisible");

  if (link) {
    link.href = SITE_CONFIG.instagramUrl;
  }

  if (label) {
    label.textContent = SITE_CONFIG.instagramLabel;
  }
}


/* =========================================================
   GOOGLE FORM
   ========================================================= */

function setupGoogleForm() {
  const frame = document.getElementById("googleForm");
  const placeholder = document.getElementById("googlePlaceholder");

  if (!frame || !placeholder) {
    return;
  }

  const url = String(SITE_CONFIG.googleFormsUrl || "").trim();

  const valid =
    url.startsWith("https://docs.google.com/forms/") &&
    !url.includes("REEMPLAZAR");

  if (!valid) {
    frame.hidden = true;
    placeholder.hidden = false;
    return;
  }

  frame.src = url;
  frame.hidden = false;
  placeholder.hidden = true;
}


/* =========================================================
   INTERACTIVE WHITE SHEEP
   - slow rotation at rest
   - faster on hover
   - mouse movement gives impulse
   - tap gives impulse
   - drag spins it directly
   ========================================================= */

function setupInteractiveSheep() {
  const holder = document.getElementById("rotatingSheep");
  const image = document.getElementById("rotatingSheepImage");

  if (!holder || !image) {
    return;
  }

  let angle = 0;
  let speed = 8;
  let targetSpeed = 8;
  let lastFrame = performance.now();

  let pointerDown = false;
  let lastPointerX = null;
  let lastPointerY = null;
  let lastPointerTime = null;

  const BASE_SPEED = 8;
  const HOVER_SPEED = 72;
  const MAX_SPEED = 320;

  holder.addEventListener("pointerenter", () => {
    if (!pointerDown) {
      targetSpeed = HOVER_SPEED;
    }
  });

  holder.addEventListener("pointerleave", () => {
    if (!pointerDown) {
      targetSpeed = BASE_SPEED;
    }

    lastPointerX = null;
    lastPointerY = null;
    lastPointerTime = null;
  });

  holder.addEventListener("pointerdown", (event) => {
    pointerDown = true;
    holder.setPointerCapture?.(event.pointerId);

    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
    lastPointerTime = performance.now();

    targetSpeed = Math.max(targetSpeed, 130);
  });

  holder.addEventListener("pointerup", (event) => {
    pointerDown = false;
    holder.releasePointerCapture?.(event.pointerId);

    // A tap gives it a visible push.
    targetSpeed = Math.min(MAX_SPEED, Math.max(targetSpeed, 165));

    lastPointerX = null;
    lastPointerY = null;
    lastPointerTime = null;
  });

  holder.addEventListener("pointercancel", () => {
    pointerDown = false;
    targetSpeed = BASE_SPEED;
  });

  holder.addEventListener("pointermove", (event) => {
    const now = performance.now();

    if (
      lastPointerX !== null &&
      lastPointerY !== null &&
      lastPointerTime !== null
    ) {
      const dx = event.clientX - lastPointerX;
      const dy = event.clientY - lastPointerY;
      const distance = Math.hypot(dx, dy);
      const elapsed = Math.max(12, now - lastPointerTime);

      const velocity = distance / elapsed * 1000;

      if (pointerDown) {
        // While dragging, horizontal movement rotates it directly.
        angle += dx * .72;
        targetSpeed = Math.min(MAX_SPEED, 65 + velocity * .16);
      } else {
        // Hover movement gives a softer impulse.
        targetSpeed = Math.min(MAX_SPEED, HOVER_SPEED + velocity * .095);
      }
    }

    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
    lastPointerTime = now;
  });

  holder.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      targetSpeed = Math.min(MAX_SPEED, targetSpeed + 110);
    }
  });

  function animate(now) {
    const delta = Math.min(.05, (now - lastFrame) / 1000);
    lastFrame = now;

    speed += (targetSpeed - speed) * Math.min(1, delta * 3.1);

    const restingTarget =
      holder.matches(":hover") ? HOVER_SPEED : BASE_SPEED;

    if (!pointerDown) {
      targetSpeed +=
        (restingTarget - targetSpeed) *
        Math.min(1, delta * 1.25);
    }

    angle = (angle + speed * delta) % 360;

    image.style.transform = `rotate(${angle}deg)`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}


/* =========================================================
   SLOW SHEEP PARADE
   ========================================================= */

function launchSheepParade(button) {
  const layer = document.getElementById("sheepLayer");

  if (!layer || !button) {
    return;
  }

  const rect = button.getBoundingClientRect();

  const startX = rect.left + rect.width * .55;
  const startY = rect.top + rect.height * .25;

  // They are deliberately staggered and slow enough to be noticed.
  const count = 6;

  for (let index = 0; index < count; index++) {
    const sheep = document.createElement("img");

    sheep.src = "assets/cordero-mic-w.svg";
    sheep.alt = "";
    sheep.className = "walking-sheep";

    const size = 58 + Math.random() * 30;
    const x = startX - 15 + Math.random() * 22;
    const y = startY - 22 + (Math.random() - .5) * 32;

    const duration = 3900 + Math.random() * 900;
    const delay = index * 235 + Math.random() * 65;

    sheep.style.setProperty("--sheep-size", `${size}px`);
    sheep.style.setProperty("--start-x", `${x}px`);
    sheep.style.setProperty("--start-y", `${y}px`);
    sheep.style.setProperty("--duration", `${duration}ms`);
    sheep.style.setProperty("--delay", `${delay}ms`);

    sheep.addEventListener("animationend", () => {
      sheep.remove();
    });

    layer.appendChild(sheep);
  }
}


/* =========================================================
   WHATSAPP BUTTONS
   ========================================================= */

function setupWhatsappTriggers() {
  const triggers = document.querySelectorAll(".wa-trigger");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const message =
        trigger.dataset.message ||
        "Hola Ovejas Punk, quiero hacer una consulta.";

      if (trigger.classList.contains("sheep-trigger")) {
        launchSheepParade(trigger);

        // We deliberately wait so the sheep animation is visible.
        window.setTimeout(() => {
          openWhatsapp(message);
        }, 3100);

        return;
      }

      openWhatsapp(message);
    });
  });

  const visibleNumber = document.getElementById("whatsappVisible");

  if (visibleNumber) {
    visibleNumber.textContent = SITE_CONFIG.whatsappLabel;
  }
}


/* =========================================================
   PRODUCT CARD TOUCH INTERACTION
   ========================================================= */

function setupProductCards() {
  const cards = document.querySelectorAll(".product-card");

  cards.forEach((card) => {
    card.addEventListener("pointerdown", () => {
      card.style.transform = "translateY(-5px) rotate(-.5deg) scale(.99)";
    });

    card.addEventListener("pointerup", () => {
      card.style.transform = "";
    });

    card.addEventListener("pointercancel", () => {
      card.style.transform = "";
    });
  });
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function setupMenu() {
  const button = document.querySelector(".menu-button");
  const nav = document.querySelector(".main-nav");

  if (!button || !nav) {
    return;
  }

  button.addEventListener("click", () => {
    const open = nav.classList.toggle("open");

    button.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");
      button.setAttribute("aria-expanded", "false");
    });
  });
}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function setupReveal() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => {
      element.classList.add("visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: .11
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}


/* =========================================================
   START
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  setupInstagram();
  setupGoogleForm();
  setupInteractiveSheep();
  setupWhatsappTriggers();
  setupProductCards();
  setupMenu();
  setupReveal();
});
