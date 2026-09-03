/* =========================================================
   OVEJAS PUNK — CONFIGURACIÓN GENERAL
   ========================================================= */

const SITE_CONFIG = {
  /*
    WHATSAPP
    Solo números, sin +, espacios ni guiones.

    Ejemplo:
    5491122334455
  */
  whatsappNumber: "54911XXXXXXXX",

  // Texto visible:
  whatsappLabel: "+54 9 11 XXXX XXXX",

  /*
    INSTAGRAM
  */
  instagramUrl: "https://www.instagram.com/ovejaspunk/",
  instagramLabel: "@ovejaspunk",

  /*
    GOOGLE FORMS

    Google Forms > Enviar > <> Insertar HTML

    Copiá únicamente el valor de:
    src="..."

    Ejemplo:
    https://docs.google.com/forms/d/e/XXXXX/viewform?embedded=true
  */
  googleFormsUrl: "REEMPLAZAR_CON_URL_EMBED_DE_GOOGLE_FORMS"
};


/* =========================================================
   WHATSAPP
   ========================================================= */

function cleanWhatsapp(value) {
  return String(value || "").replace(/\D/g, "");
}

function whatsappConfigured() {
  const raw = String(SITE_CONFIG.whatsappNumber || "");
  const number = cleanWhatsapp(raw);

  return number.length >= 8 && !raw.includes("X");
}

function whatsappUrl(message) {
  if (!whatsappConfigured()) {
    return null;
  }

  return (
    `https://wa.me/${cleanWhatsapp(SITE_CONFIG.whatsappNumber)}` +
    `?text=${encodeURIComponent(message)}`
  );
}

function openWhatsapp(message) {
  const url = whatsappUrl(message);

  if (!url) {
    alert(
      "WhatsApp ya está configurado en la web, pero falta cargar el número real. " +
      "Abrí script.js y reemplazá whatsappNumber dentro de SITE_CONFIG."
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
  const label = document.getElementById("instagramLabel");

  if (label) {
    label.textContent = SITE_CONFIG.instagramLabel;
  }

  if (link) {
    link.href = SITE_CONFIG.instagramUrl;
  }
}


/* =========================================================
   GOOGLE FORM
   ========================================================= */

function setupGoogleForm() {
  const frame = document.getElementById("googleForm");
  const placeholder = document.getElementById("formPlaceholder");

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
   OVEJA INTERACTIVA
   ========================================================= */

function setupRotor() {
  const holder = document.getElementById("rotor");
  const image = document.getElementById("rotorImage");

  if (!holder || !image) {
    return;
  }

  let angle = 0;
  let speed = 8;
  let targetSpeed = 8;
  let lastFrame = performance.now();

  let dragging = false;
  let lastX = null;
  let lastY = null;
  let lastPointerTime = null;

  const BASE_SPEED = 8;
  const HOVER_SPEED = 72;
  const MAX_SPEED = 320;

  holder.addEventListener("pointerenter", () => {
    if (!dragging) {
      targetSpeed = HOVER_SPEED;
    }
  });

  holder.addEventListener("pointerleave", () => {
    if (!dragging) {
      targetSpeed = BASE_SPEED;
    }

    lastX = null;
    lastY = null;
    lastPointerTime = null;
  });

  holder.addEventListener("pointerdown", (event) => {
    dragging = true;

    holder.setPointerCapture?.(event.pointerId);

    lastX = event.clientX;
    lastY = event.clientY;
    lastPointerTime = performance.now();

    targetSpeed = Math.max(targetSpeed, 130);
  });

  holder.addEventListener("pointerup", (event) => {
    dragging = false;

    holder.releasePointerCapture?.(event.pointerId);

    targetSpeed = Math.min(
      MAX_SPEED,
      Math.max(targetSpeed, 165)
    );

    lastX = null;
    lastY = null;
    lastPointerTime = null;
  });

  holder.addEventListener("pointercancel", () => {
    dragging = false;
    targetSpeed = BASE_SPEED;
  });

  holder.addEventListener("pointermove", (event) => {
    const now = performance.now();

    if (
      lastX !== null &&
      lastY !== null &&
      lastPointerTime !== null
    ) {
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      const distance = Math.hypot(dx, dy);

      const elapsed = Math.max(
        12,
        now - lastPointerTime
      );

      const pointerVelocity =
        distance / elapsed * 1000;

      if (dragging) {
        angle += dx * .72;

        targetSpeed = Math.min(
          MAX_SPEED,
          65 + pointerVelocity * .16
        );
      } else {
        targetSpeed = Math.min(
          MAX_SPEED,
          HOVER_SPEED + pointerVelocity * .095
        );
      }
    }

    lastX = event.clientX;
    lastY = event.clientY;
    lastPointerTime = now;
  });

  holder.addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      targetSpeed = Math.min(
        MAX_SPEED,
        targetSpeed + 110
      );
    }
  });

  function animate(now) {
    const delta = Math.min(
      .05,
      (now - lastFrame) / 1000
    );

    lastFrame = now;

    speed +=
      (targetSpeed - speed) *
      Math.min(1, delta * 3.1);

    const restingTarget =
      holder.matches(":hover")
        ? HOVER_SPEED
        : BASE_SPEED;

    if (!dragging) {
      targetSpeed +=
        (restingTarget - targetSpeed) *
        Math.min(1, delta * 1.25);
    }

    angle =
      (angle + speed * delta) % 360;

    image.style.transform =
      `rotate(${angle}deg)`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}


/* =========================================================
   ANIMACION LENTA DE OVEJAS AL CONSULTAR
   ========================================================= */

function launchSheep(button) {
  const layer =
    document.getElementById("sheepLayer");

  if (!layer || !button) {
    return;
  }

  const rect =
    button.getBoundingClientRect();

  const startX =
    rect.left + rect.width * .55;

  const startY =
    rect.top + rect.height * .25;

  const count = 6;

  for (
    let index = 0;
    index < count;
    index++
  ) {
    const sheep =
      document.createElement("img");

    sheep.src =
      "assets/cordero-mic-w.svg";

    sheep.alt = "";
    sheep.className = "walking-sheep";

    const size =
      58 + Math.random() * 30;

    const x =
      startX - 15 + Math.random() * 22;

    const y =
      startY - 22 +
      (Math.random() - .5) * 32;

    const duration =
      3900 + Math.random() * 900;

    const delay =
      index * 235 +
      Math.random() * 65;

    sheep.style.setProperty(
      "--sheep-size",
      `${size}px`
    );

    sheep.style.setProperty(
      "--start-x",
      `${x}px`
    );

    sheep.style.setProperty(
      "--start-y",
      `${y}px`
    );

    sheep.style.setProperty(
      "--duration",
      `${duration}ms`
    );

    sheep.style.setProperty(
      "--delay",
      `${delay}ms`
    );

    sheep.addEventListener(
      "animationend",
      () => sheep.remove()
    );

    layer.appendChild(sheep);
  }
}


/* =========================================================
   BOTONES WHATSAPP
   ========================================================= */

function setupWhatsappTriggers() {
  const triggers =
    document.querySelectorAll(
      ".whatsapp-trigger"
    );

  triggers.forEach((trigger) => {
    trigger.addEventListener(
      "click",
      () => {
        const message =
          trigger.dataset.message ||
          "Hola Ovejas Punk, quiero hacer una consulta.";

        if (
          trigger.classList.contains(
            "sheep-trigger"
          )
        ) {
          launchSheep(trigger);

          /*
            Esperamos antes de abrir WhatsApp
            para que se vea la animación.
          */
          window.setTimeout(
            () => openWhatsapp(message),
            3100
          );

          return;
        }

        openWhatsapp(message);
      }
    );
  });

  const visible =
    document.getElementById(
      "whatsappLabel"
    );

  if (visible) {
    visible.textContent =
      SITE_CONFIG.whatsappLabel;
  }
}


/* =========================================================
   MENU RESPONSIVE
   ========================================================= */

function setupMenu() {
  const button =
    document.querySelector(".menu-toggle");

  const nav =
    document.querySelector(".main-nav");

  if (!button || !nav) {
    return;
  }

  button.addEventListener(
    "click",
    () => {
      const open =
        nav.classList.toggle("open");

      button.setAttribute(
        "aria-expanded",
        String(open)
      );

      document.body.classList.toggle(
        "menu-open",
        open
      );
    }
  );

  nav.querySelectorAll("a").forEach(
    (link) => {
      link.addEventListener(
        "click",
        () => {
          nav.classList.remove("open");
          document.body.classList.remove(
            "menu-open"
          );

          button.setAttribute(
            "aria-expanded",
            "false"
          );
        }
      );
    }
  );
}


/* =========================================================
   APARICION AL HACER SCROLL
   ========================================================= */

function setupReveal() {
  const elements =
    document.querySelectorAll(".reveal");

  if (
    !("IntersectionObserver" in window)
  ) {
    elements.forEach(
      (element) =>
        element.classList.add("visible")
    );

    return;
  }

  const observer =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );
          }
        });
      },
      {
        threshold: .11
      }
    );

  elements.forEach(
    (element) =>
      observer.observe(element)
  );
}


/* =========================================================
   INICIO
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {
    setupInstagram();
    setupGoogleForm();
    setupRotor();
    setupWhatsappTriggers();
    setupMenu();
    setupReveal();
  }
);
