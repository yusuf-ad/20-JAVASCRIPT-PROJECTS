"use strict";

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

// Global variables
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

// Unsplash API
let initialLoad = 5;
const apiKey = "NhQKL9G0R51cuv_LKkgIIKmB4QgARK_o3Fyc-AQ2Xyk";
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialLoad}`;

function updateAPIURLWithNewCount(picCount) {
  apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}

// ! Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    isInitialLoad = false;
    updateAPIURLWithNewCount(20);
  }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) element.setAttribute(key, attributes[key]);
}

// ! Create elements for links & photos, add to DOM
const displayPhotos = function () {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // ! Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // ! Event listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    // ? Put <img> inside <a>, then put both inside imageContainer element
    item.appendChild(img);
    // item.append(img)
    imageContainer.appendChild(item);
  });
};

// ! Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();

    displayPhotos();
  } catch (error) {
    console.error("Whoops, something happened :(");
  }
}

// ! Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    console.log(apiURL);
  }
});

// On load
getPhotos();
