"use strict";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// * global variable
let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

const randomNum = function () {
  return Math.floor(Math.random() * apiQuotes.length);
};

// ! Show new quote
function newQuote() {
  showLoadingSpinner();
  // * Pick a random quote from apiQuotes array
  const quote = apiQuotes[randomNum()];

  authorText.textContent = quote.author;

  // * Check quote length

  if (quote.text.length > 120) quoteText.classList.add("long-quote");
  else quoteText.classList.remove("long-quote");

  // Set quote, hide loader
  removeLoadingSpinner();

  quoteText.textContent = quote.text;
}

// ! Get quotes from API
async function getQuotes() {
  showLoadingSpinner();
  const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();

    newQuote();
  } catch (error) {
    // Catch Error Here
    console.error("Whoops, no quote", error);
  }
}

// ! Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.text}`;
  window.open(twitterUrl, "_blank");
}

// ! Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// ! On load
getQuotes();
