const API = 'https://wind-bow.gomix.me/twitch-api';

const USERNAMES = ["freecodecamp", "adam13531", "bobross", "lirik", "tsm_viss", "eleaguetv", "summit1g", "redbull", "theluckmusic", "noopkat", "jessicamak", "monstercat"];

const streamers = [];

const root = document.querySelector('.streamers');

USERNAMES.forEach(user => {
  fetchData(`/channels/${user}`, channel => {
    fetchData(`/streams/${user}`, stream => {
      root.appendChild(createCard(channel, stream));
    });
  });
});

// Create card mark up for each streamer
function createCard(channel, stream) {
  const gridItem = document.createElement('div');
  gridItem.setAttribute('class', 'grid-item');

  const a = document.createElement('a');
  a.setAttribute('class', 'streamer');
  a.setAttribute('target', '_blank');
  a.href = channel.url;

  const image = document.createElement('div');
  image.setAttribute('class', 'image');
  image.innerHTML = `<img class="logo" src="${channel.logo}" />`;

  const info = document.createElement('div');
  info.setAttribute('class', 'info');

  const game = stream.stream ? stream.stream.game : 'Offline';
  const viewers = stream.stream ? stream.stream.viewers : 0;
  info.innerHTML = `<h3 class="name">${channel.display_name}</h3>`;
  info.innerHTML += `<p class="game">${game}</p>`;
  info.innerHTML += `<p class="vwrs"><b>Viewers: </b>${viewers}</p>`;

  const status = document.createElement('span');
  if (stream.stream)
    status.setAttribute('class', 'status online');
  else
    status.setAttribute('class', 'status offline');

  a.appendChild(image);
  a.appendChild(info);
  a.appendChild(status);

  gridItem.appendChild(a);

  // Add each card to streamers with isOnline property
  // to be used for filtering
  streamers.push({
    card: gridItem,
    isOnline: stream.stream ? true : false,
  });

  return gridItem;
}

function fetchData(path, callback) {
  $.getJSON(API + path + '?callback=?', callback);
}


function getAll() {
  highlightItem(this);
  streamers.forEach(streamer => {
    root.appendChild(streamer.card);
  });
}

function getOnline() {
  highlightItem(this);
  streamers.forEach(streamer => {
    if (streamer.isOnline)
      root.appendChild(streamer.card);
  });
}

function getOffline() {
  highlightItem(this);
  streamers.forEach(streamer => {
    if (!streamer.isOnline)
      root.appendChild(streamer.card);
  });
}

// Apply hover and select effect for nav items
function highlightItem(target) {
  root.innerHTML = '';
  menuItems.forEach(item => item.classList.remove('active'));
  target.classList.add('active');
}

const menuItems = document.querySelectorAll('li');
menuItems[0].addEventListener('click', getAll);
menuItems[1].addEventListener('click', getOnline);
menuItems[2].addEventListener('click', getOffline);