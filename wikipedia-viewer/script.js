const BASE_URL = 'https://en.wikipedia.org/w/api.php';
const search = document.querySelector('.search');
const searchBtn = document.querySelector('.search-btn');
const results = document.querySelector('.results');

function getInfo() {
  const searcQuery = search.value;
  if (!searcQuery) return;

  $.ajax({
    url: BASE_URL,
    data: {
      "action": "query",
      "format": "json",
      "list": "search",
      "utf8": 1,
      "srsearch": searcQuery,
    },
    dataType: 'jsonp',
    success: data => done(data),
    error: error => fail(error),
  });
}

function fail(error) {
  console.log(error.statusText);
}

function done(data) {
  results.innerHTML = '';

  if (!data.query.search.length) {
    const div = document.createElement('div');
    div.setAttribute('class', 'not-found');

    div.innerHTML = '<p>Your search did not match any document.</p>';
    div.innerHTML += '<p>Suggestions:</p><ul>';
    div.innerHTML += '<li>Search for another query</li>';
    div.innerHTML += '<li>Use Random button to get a random wikipedia page</li>';
    div.innerHTML += '</ul>';

    results.appendChild(div);
    return;
  }

  data.query.search.forEach(result => showResult(result, results));
}

function showResult(result, container) {
  const div = document.createElement('div');
  div.setAttribute('class', 'result-div');
  div.innerHTML = `<h3 class="result-title"><a target="_blank" href="http://en.wikipedia.org/?curid=${result.pageid}">${result.title}</a></h3>`;
  div.innerHTML += `<span class="result-link">http://en.wikipedia.org/?curid=${result.pageid}</span>`;
  div.innerHTML += `<p class="result-snippet">${result.snippet} ...</p>`;

  container.appendChild(div);
}

searchBtn.addEventListener('click', e => {
  e.preventDefault();
  getInfo();
});