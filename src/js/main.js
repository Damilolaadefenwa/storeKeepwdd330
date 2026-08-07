import { loadHeaderFooter, setDynamicDates, setupMobileMenu } from "./util.mjs";

async function initializeApp() {
  // 1. Loading the header and footer into the DOM first
  await loadHeaderFooter();

  //2. Injecting Mobile Menu
  setupMobileMenu();

  //3. Injecting the dynamic dates
  setDynamicDates();
}

initializeApp();
