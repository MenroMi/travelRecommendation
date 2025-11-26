export const initRouter = () => {
  function showActualPage(id) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
  }

  function router() {
    const route = location.hash.slice(2) || 'home'; // "#/about" → "about"
    showActualPage(route);

  }

  function emphasizeNode(id) {
    const links = document.querySelectorAll('[data-link]');
    links.forEach(l => {
      l.classList.remove('active');
      if (l.textContent === id) l.classList.add('active');
    });
  }

  const navigation = document.querySelector('nav');
  navigation.addEventListener('click', (e) => {
    const target = e.target;

    if (target.tagName !== 'A') return;

    e.preventDefault();

    history.pushState(null, '', target.href);
    router();
    emphasizeNode(e.target.textContent);
  });

  window.addEventListener('hashchange', router);
  router();
};