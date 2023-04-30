"use strict";

const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.getElementById("quote");
const fromText = document.querySelector(".from");
const quoteChar = document.querySelector("#character");
const loader = document.querySelector(".loader");
const btnNew = document.querySelector(".btn-new");
const btnPrev = document.querySelector(".btn-prev");

let quoteData = {};
let preQuote = [];

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function loaded() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

const newQuote = async function () {
  loading();
  await getQuote();

  const quote = quoteData;
  preQuote[0] = quote;

  fromText.textContent = quote.anime;
  quoteChar.textContent = quote.character;

  if (quote.quote.length > 50) quoteText.classList.add("long-quote");
  else quoteText.classList.remove("long-quote");

  console.log(quote.quote);
  loaded();
  quoteText.textContent = quote.quote;
};

// const prevQuote = async function () {
//   loading();

//   console.log(preQuote);

//   fromText.textContent = preQuote[0].anime;
//   quoteChar.textContent = preQuote[0].character;

//   if (preQuote[0].quote.length > 50) quoteText.classList.add("long-quote");
//   else quoteText.classList.remove("long-quote");

//   loaded();
//   quoteText.textContent = preQuote[0].quote;
// };

const getQuote = async function () {
  const apiURL = "https://animechan.vercel.app/api/random";
  try {
    const response = await fetch(apiURL);
    quoteData = await response.json();

    // newQuote();
    // console.log(quoteData);
  } catch (error) {
    console.error("Whoops, something happened :(");
  }
};

// ! Event Listeners

btnNew.addEventListener("click", newQuote);
// btnPrev.addEventListener("click", prevQuote);

// ! On Load
newQuote();
