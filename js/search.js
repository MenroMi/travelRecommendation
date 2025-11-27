
export const initSearch = (helpers) => {
  const FALLBACK_MSG = 'No available recommendations';

  const searchInput = document.querySelector('#search-input');

  async function requestRecommendations() {
    try {
      const res = await fetch('./api/travel_recommendation_api.json');
      return res.ok ? await res.json() : FALLBACK_MSG;
    } catch (error) {
      console.warn('Failed to request travel recommendations: ', error);
      return FALLBACK_MSG;
    }
  }

  function removeNode(parent, removingNode) {
    if (removingNode) parent.removeChild(removingNode);
  }

  function clear(e) {
    e.preventDefault();
    const cards = document.querySelector('.search-cards');

    searchInput.value = '';
    if (cards) removeNode(document.body, cards);
  }

  async function search(e) {
    e.preventDefault();
    const cards = document.querySelector('.search-cards');

    // clean DOM before applying new bunch of cards
    removeNode(document.body, cards);

    const value = searchInput.value?.toLowerCase()?.trim();
    if (!value) return null;

    const recommendations = await requestRecommendations();
    const foundRecommendations = helpers.findEnterRecommendation(recommendations, value);

    if (foundRecommendations.length > 0) {
      const body = document.body;
      const cardsWrapper = document.createElement('div');
      cardsWrapper.classList.add('search-cards');

      foundRecommendations.forEach(recommendation => {
        cardsWrapper.appendChild(helpers.createCard(recommendation));
      });

      body.appendChild(cardsWrapper);
    }

  }

  function applyInputEvent() {
    const searchBtn = document.querySelector('.search-btn');
    const clearBtn = document.querySelector('.clear-btn');

    searchBtn.addEventListener('click', search);
    clearBtn.addEventListener('click', clear);
  }

  applyInputEvent();
};