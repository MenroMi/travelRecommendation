import { initRouter } from "./router.js";
import { initSearch } from "./search.js";
import { initHelpers } from "./helpers.js";

window.addEventListener('DOMContentLoaded', () => {
  const helpers = initHelpers();

  initRouter();
  initSearch(helpers);
});