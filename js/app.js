/* MyTinyJesus — framework-free behaviour
   Renders a shuffled fictional message pool and preserves the 2009-style bubble motion. */

import { MESSAGES } from "./messages.js";

(() => {
  const messages = [...MESSAGES];

  const bubble = document.querySelector(".speech-bubble");
  const messageElement = document.querySelector(".speech-bubble__message");
  const nameElement = document.querySelector(".speech-bubble__meta strong");
  const dateElement = document.querySelector(".speech-bubble__meta time");
  const countElement = document.querySelector(".message-count");

  if (
    !bubble ||
    !messageElement ||
    !nameElement ||
    !dateElement ||
    messages.length === 0
  ) {
    return;
  }

  const shuffled = messages.sort(() => Math.random() - 0.5);
  let index = 0;
  let timerId = 0;
  let transitionId = 0;

  if (countElement) {
    countElement.textContent = String(shuffled.length);
  }

  function setMessage(message) {
    messageElement.textContent = message.text;
    nameElement.textContent = message.name;
    dateElement.textContent = message.date;
  }

  function revealCurrent() {
    setMessage(shuffled[index]);
    window.requestAnimationFrame(() =>
      bubble.classList.add("speech-bubble--visible")
    );
  }

  function showNext() {
    bubble.classList.remove("speech-bubble--visible");
    window.clearTimeout(transitionId);
    transitionId = window.setTimeout(() => {
      index = (index + 1) % shuffled.length;
      revealCurrent();
    }, 170);
  }

  revealCurrent();
  timerId = window.setInterval(showNext, 9000);
  bubble.addEventListener("click", showNext);
  window.addEventListener("beforeunload", () => window.clearInterval(timerId), {
    once: true,
  });
})();
