import './css/style.css';

const targetEl = document.querySelector('.flexbox');
// get the articles
const getDevArticles = async () => {
  const response = await fetch('https://dev.to/api/articles');
  const articles = await response.json();
  return articles;
};

const logger = (type, message, extra = '') => {
  const badge = `%c${type}`;
  const style =
    'color: white; background-color: orange; padding: 2px 5px; border-radius: 5px; font-weight: bold';
  console.log(badge, style, message, extra);
};

getDevArticles().then((articles) => {
  document.getElementById('articles').innerHTML = '';
  articles.forEach((article) => {
    const articleEl = document.createElement('article');

    articleEl.innerHTML = `
    <div class="article-container">
      <div class="row">
        <div class="col s12">
          <div class="card blue-grey darken-1">
            <div class="card-image">
              <img src="${article.cover_image || ''}">
            </div>
            <div class="card-content white-text">
              <span class="card-title">${article.title}</span>
              <p>${article.description}</p>
            </div>
            <div class="card-action">
              <a href="${article.url}">Read more!</a>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    targetEl.appendChild(articleEl);
  });
});

// Register the service worker in the browser
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
    navigator.serviceWorker.ready.then((registration) => {
      logger('Service Worker', 'Service Worker is ready', registration);
    });
  });
}
