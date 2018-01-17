const quoteElement = document.querySelector('.quote');
const authorElement = document.querySelector('.author');
const tweetLink = document.querySelector('.twitter-btn');
const quoteBtn = document.querySelector('.new-quote-btn');

// Playing with async/await

function getNewQuote() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch('https://talaikis.com/api/quotes/random/');
    const json = await response.json();
    
    if (json) resolve(json);
    else reject("Can't get new quote!");
  });
}

async function showQuote() {
  const quoteElement = document.querySelector('.quote');
  const authorElement = document.querySelector('.author');
  const tweetLink = document.querySelector('.twitter-btn');
  
  const quote = await getNewQuote();
  if (quote) {
    quoteElement.innerHTML = quote.quote;
    authorElement.innerHTML = quote.author;
    const tweet = 'https://twitter.com/intent/tweet?text=' +
          quote.quote + ' - ' + quote.author;
    tweetLink.href = tweet;
  }
}

showQuote();

quoteBtn.addEventListener('click', showQuote);