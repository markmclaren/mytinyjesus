/* MyTinyJesus — framework-free behaviour
   Renders a shuffled fictional message pool and preserves the 2009-style bubble motion. */

import { MESSAGES } from "./messages.js";

(() => {
  const messages = [...MESSAGES];

  const stage = document.querySelector(".tiny-jesus-stage");
  const bubble = document.querySelector(".speech-bubble");
  const messageElement = document.querySelector(".speech-bubble__message");
  const nameElement = document.querySelector(".speech-bubble__meta strong");
  const dateElement = document.querySelector(".speech-bubble__meta time");
  const countElement = document.querySelector(".message-count");

  if (
    !stage ||
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

  function showMessage(delta) {
    bubble.classList.remove("speech-bubble--visible");
    window.clearTimeout(transitionId);
    transitionId = window.setTimeout(() => {
      index = (index + delta + shuffled.length) % shuffled.length;
      revealCurrent();
    }, 170);
  }

  function showNext() {
    showMessage(1);
  }

  function showPrevious() {
    showMessage(-1);
  }

  function handleMessageNavigation(event) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }
  }

  function startEntrance() {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        stage.classList.add("entrance-play");
        window.setTimeout(revealCurrent, 1440);
      });
    });
  }

  startEntrance();
  timerId = window.setInterval(showNext, 9000);
  bubble.addEventListener("click", showNext);
  window.addEventListener("keydown", handleMessageNavigation);
  window.addEventListener("beforeunload", () => window.clearInterval(timerId), {
    once: true,
  });
})();
