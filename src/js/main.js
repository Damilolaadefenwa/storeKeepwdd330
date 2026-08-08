/* This single file entry script initializes 
the global partials, mobile menu, homepage widget metrics, and product table seamlessly: */

import { initInventoryWidget, initProductsPage } from "./product.mjs";
import { loadHeaderFooter, setDynamicDates, setupMobileMenu } from "./util.mjs";

async function initializeApp() {
  // 1. Loading Partial header and footer into the DOM first
  await loadHeaderFooter();

  // 2. Attach UI Events & Dynamic Dates
  setDynamicDates();
  setupMobileMenu();

  // 3. Initialize Homepage Inventory Widget (if present on DOM)
  await initInventoryWidget();

  // 4. Initialize Products Table Page (if present on DOM)
  await initProductsPage();
}

initializeApp();
