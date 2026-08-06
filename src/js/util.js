//1. save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

//2. retrieve data from localstorage
export function getLocalStorage(key) {
  // Getting data from local storage
  const data = localStorage.getItem(key);
  // Try to fetching the data from local storage
  try {
    const parsedData = JSON.parse(data);
    if (Array.isArray(parsedData)) {
      return parsedData;
    }
  } catch (error) {
    // If parsing fails,the data is not a valid JSON array
    // In that case, I initialize it as an empty array
    localStorage.setItem(key, JSON.stringify([]));
  }
  //return an empty array if data isn't an array or parsing fails,
  return [];
}

//3.Fetching Footer and Header data
export async function loadTemplate(path) {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const template = await response.text();

    return template;
  } catch (error) {
    // console.error(error);
  }
}

//4.Rendering Template
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

//5.Dynamic Header and Footer.
export async function loadHeaderFooter() {
  let baseUrl = import.meta.env.BASE_URL;
  let headerTemplate = await loadTemplate(baseUrl + "partials/header.html");
  let footerTemplate = await loadTemplate(baseUrl + "partials/footer.html");

  // Replace absolute paths with base URL prefixed paths
  const replaceAbsolutePaths = (template) =>
    template
      .replace(/href="\/sleepoutsidewdd330\//g, `href="${baseUrl}`)
      .replace(/src="\/sleepoutsidewdd330\//g, `src="${baseUrl}`)
      .replace(/href="\//g, `href="${baseUrl}`)
      .replace(/src="\//g, `src="${baseUrl}`);

  headerTemplate = replaceAbsolutePaths(headerTemplate);
  footerTemplate = replaceAbsolutePaths(footerTemplate);

  const headerElement = document.getElementById("header");
  const footerElement = document.getElementById("footer");

  //1. The Current year for the copyright
  const copyrightYearSpan = document.getElementById("current-year");
  const currentYear = new Date().getFullYear();
  copyrightYearSpan.textContent = currentYear;

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}
