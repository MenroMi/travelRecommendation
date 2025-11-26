export const initHelpers = () => {

  function checkIsObject(el) {
    return el !== null && typeof el === 'object';
  }

  function createCard(recommendation) {
    const image = document.createElement('img');
    const cardTitle = document.createElement('h3');
    const cardDescription = document.createElement('p');
    const visitBtn = document.createElement('button');

    const card = document.createElement('div');
    const contentCard = document.createElement('div');

    // WRAPPERS
    card.classList.add('search-card');
    contentCard.classList.add('content-card');

    // CONTENT
    image.src = recommendation?.imageUrl;
    image.alt = recommendation.name;
    cardTitle.textContent = recommendation.name;
    cardDescription.textContent = recommendation.description;
    visitBtn.textContent = 'Visit';
    visitBtn.classList.add('btn-base', 'btn-card');

    contentCard.appendChild(cardTitle);
    contentCard.appendChild(cardDescription);
    contentCard.appendChild(visitBtn);

    card.appendChild(image);
    card.appendChild(contentCard);

    return card;
  }

  function findEnterRecommendation(recommendations, value) {
    const searchValue = value?.trim()?.toString().toLowerCase();

    // FIRST LEVEL
    const foundKey = Object.keys(recommendations).find(k => k.includes(searchValue));
    if (foundKey) return recommendations[foundKey] ?? [];

    // SECOND LEVEL
    const foundAnyEnter = (node) => {
      if (node == null) return false;

      const isObject = checkIsObject(node);

      if (!isObject) {
        return node.toString().toLowerCase().includes(searchValue) ? node : false;
      }

      const collection = Array.isArray(node) ? node : Object.values(node);

      for (const el of collection) {
        if (checkIsObject(el)) {
          const passedEl = foundAnyEnter(el);
          if (passedEl) return passedEl;
        } else if (
          el != null &&
          el.toString().toLowerCase().includes(searchValue)
        ) {
          return node;
        }
      }

      return false;
    };

    const results = [];

    for (const recommendation of Object.values(recommendations)) {
      if (!Array.isArray(recommendation)) continue;

      for (const r of recommendation) {
        const passedRec = foundAnyEnter(r);
        if (passedRec) results.push(passedRec);
      }
    }

    return results;
  }


  return { createCard, findEnterRecommendation };
};