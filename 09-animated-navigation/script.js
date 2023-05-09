"use strict";

const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const navEls = Object.values(document.querySelector(".nav-links").children);

function animateIn() {
  // todo animate in - overlay
  // overlay.classList.add("overlay-slide-right");
  // overlay.classList.remove("overlay-slide-left");
  // ! The reason that this is happening is because we can't replace a class
  // with another class. If that first class isn't there.
  overlay.classList.replace("overlay-slide-left", "overlay-slide-right");

  // todo animate in -nav items
  navEls.forEach((el, i) => {
    // el.classList.remove(`slide-out-${i + 1}`);
    // el.classList.add(`slide-in-${i + 1}`);
    el.classList.replace(`slide-out-${i + 1}`, `slide-in-${i + 1}`);
  });
}

function animateOut() {
  // todo animate out - overlay
  // overlay.classList.add("overlay-slide-left");
  // overlay.classList.remove("overlay-slide-right");
  overlay.classList.replace("overlay-slide-right", "overlay-slide-left");

  navEls.forEach((el, i) => {
    // todo animate out - nav items
    el.classList.replace(`slide-in-${i + 1}`, `slide-out-${i + 1}`);
  });
}

function toggleNav() {
  // todo toggle: menu bars open/closed
  menuBars.classList.toggle("change");
  // todo toggle: menu active
  overlay.classList.toggle("overlay-active");
  if (overlay.classList.contains("overlay-active")) animateIn();
  else animateOut();
}

// ! Event listeners
menuBars.addEventListener("click", toggleNav);

navEls.forEach((el) => {
  el.addEventListener("click", toggleNav);
});
