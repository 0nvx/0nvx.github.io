/* ============================================================
   particles.js — Floating code symbols background effect
   Injects animated symbols into .floating-symbols container.
   ============================================================ */

/* Symbol definitions — text + left position + animation delay */
const SYMBOLS = [
  { text: "0x",   left: "6%",  delay: "0s"  },
  { text: "{}",   left: "18%", delay: "3s"  },
  { text: "</>",  left: "34%", delay: "7s"  },
  { text: "sudo", left: "52%", delay: "1s"  },
  { text: "root", left: "68%", delay: "5s"  },
  { text: "$_",   left: "82%", delay: "9s"  },
  { text: "0xff", left: "92%", delay: "4s"  },
];

/* Create and mount the floating symbols layer */
function initParticles() {
  /* Container already exists in HTML; just populate it */
  const container = document.querySelector(".floating-symbols");
  if (!container) return;

  SYMBOLS.forEach(({ text, left, delay }) => {
    const span = document.createElement("span");
    span.className = "symbol";
    span.textContent = text;
    span.setAttribute("aria-hidden", "true");
    /* CSS vars consumed by the float-up keyframe in animations.css */
    span.style.left = left;
    span.style.animationDelay = delay;
    container.appendChild(span);
  });
}

/* Run after DOM is ready */
document.addEventListener("DOMContentLoaded", initParticles);
