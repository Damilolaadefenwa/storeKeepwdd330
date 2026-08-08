//This file contains the generic fetch function and local storage helpers.

//1. Generic External Data Service (Render Proxy Fetcher)
const PROXY_BASE_URL = "https://storekeepproxy-wdd330.onrender.com";

export async function fetchExternalData(endpoint) {
  try {
    const response = await fetch(`${PROXY_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Server response error: ${response.status}`);
    }
    return await response.text(); //raw response text
  } catch (error) {
    return null;
  }
}

//2. save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

//3. retrieve data from localstorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  try {
    const parsedData = JSON.parse(data);
    return parsedData || null; // Returns the data whether it is an object or array
  } catch (error) {
    return null;
  }
}

//4.Fetching HTML template data
export async function loadTemplate(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    // console.error("Template loading failed:", error);
    return "";
  }
}

//5.Rendering Template
export function renderWithTemplate(template, parentElement, data, callback) {
  if (parentElement) {
    parentElement.innerHTML = template;
    if (callback) callback(data);
  }
}

//6.Dynamic Header and Footer.
export async function loadHeaderFooter() {
  // Grabbing the dynamic base URL from Vite
  const baseUrl = import.meta.env.BASE_URL;

  //Creating the paths and using .replace to solve the issue of having a double-slash like "//partials"
  const headerPath = `${baseUrl}partials/header.html`.replace("//", "/");
  const footerPath = `${baseUrl}partials/footer.html`.replace("//", "/");

  const headerTemplate = await loadTemplate(headerPath);
  const footerTemplate = await loadTemplate(footerPath);

  const headerElement = document.getElementById("header");
  const footerElement = document.getElementById("footer");

  // Rendering if the templates successfully fetched actual content
  if (headerTemplate && headerElement) {
    renderWithTemplate(headerTemplate, headerElement);
  }
  if (footerTemplate && footerElement) {
    renderWithTemplate(footerTemplate, footerElement);
  }
}

// 7. Dynamic Dates Function
export function setDynamicDates() {
  // Setting copyright year in footer
  const copyrightYearSpan = document.getElementById("current-year");
  if (copyrightYearSpan) {
    copyrightYearSpan.textContent = new Date().getFullYear();
  }

  // Setting current date in the Hero section
  const currentDateElement = document.getElementById("current-date");
  if (currentDateElement) {
    // Formatting date to appear nicely like "Friday, August 7"
    const options = { weekday: "long", month: "long", day: "numeric" };
    currentDateElement.textContent = new Date().toLocaleDateString(
      "en-US",
      options,
    );
  }
}

// 8. Mobile Menu Toggle
export function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const sidebar = document.getElementById("main-sidebar");

  // Checking always if element exist on the current page
  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("is-open");
    });
  }
}
