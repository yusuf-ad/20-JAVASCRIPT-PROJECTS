"use strict";
// JavaScript is the reaction of data change on a Web page.

const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const navEls = Object.values(document.querySelector(".nav-links").children);

const navAnimation = function (direction1, direction2) {
  navEls.forEach((el, i) => {
    // el.classList.remove(`slide-out-${i + 1}`);
    // el.classList.add(`slide-in-${i + 1}`);
    el.classList.replace(
      `slide-${direction1}-${i + 1}`,
      `slide-${direction2}-${i + 1}`
    );
  });
};

function toggleNav() {
  // todo toggle: menu bars open/closed
  menuBars.classList.toggle("change");
  // todo toggle: menu active
  overlay.classList.toggle("overlay-active");
  if (overlay.classList.contains("overlay-active")) {
    // todo animate in - overlay
    // overlay.classList.add("overlay-slide-right");
    // overlay.classList.remove("overlay-slide-left");
    // ! The reason that this is happening is because we can't replace a class
    //  !with another class. If that first class isn't there.
    overlay.classList.replace("overlay-slide-left", "overlay-slide-right");
    // todo animate out -nav items
    navAnimation("out", "in");
  } else {
    // todo animate out - overlay
    overlay.classList.replace("overlay-slide-right", "overlay-slide-left");
    // todo animate out - nav items
    navAnimation("in", "out");
  }
}

// ! Event listeners
menuBars.addEventListener("click", toggleNav);
navEls.forEach((el) => {
  el.addEventListener("click", toggleNav);
});
