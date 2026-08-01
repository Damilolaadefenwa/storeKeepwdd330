
# StoreKeepWdd330 Frontend Dashboard

A decoupled Single Page Application (SPA) designed as easy to use dashboard for managing Shopify store datasets. Built with pure vanilla JavaScript, this project utilizes Client-Side Rendering (CSR) to fetch and render raw transactional data provided by an external Node.js proxy backend service.

## 🏗️ Architectural Overview
* **Decoupled Architecture:** The presentation layer is fully isolated from the database and server logic. It operates independently as a static frontend bundle.
* **Client-Side Rendering (CSR):** Data is fetched asynchronously via the browser's Native Fetch API. The UI is dynamically assembled inside the DOM in real-time without full page reloads.
* **Security Separation:** It makes zero direct calls to Shopify, completely avoiding CORS bottlenecks and preventing client-side exposing of critical API credentials.

## 🛠️ Tech Stack & Patterns
* **Language:** Vanilla JavaScript (ES6+)
* **UI/UX:** HTML5 semantic layout & responsive CSS Grid system
* **Routing / Rendering:** Dynamic DOM manipulation using state-driven UI modules (widgets)
* **Data Ingestion:** Asynchronous JavaScript (`async/await`) fetching from an external backend

## 🎛️ Dashboard Widget Modules

The layout is structurally split into unique, single-purpose dashboard cards:
1. **Inventory Stock Summary Widget:** 
2. **Sales/Order Summary Widget:** 
3. **Shipping and Weather Insight widgets:** 

## ⚙️ Development & Local Launch

Since this is a client-side architecture with no compiler dependencies, you can run the UI directly inside any standard browser environment.

1. **Clone the frontend repository:**
   ```bash
   git clone <your-private-frontend-repo-url>
   cd <your-frontend-folder>
   ```

2. **Configure your API Source:**
   Open your main entry JavaScript file (e.g., `app.js` or `dashboard.js`) and ensure the endpoint variable points to your live Render proxy backend instance:
   ```javascript
   const BACKEND_URL = "https://onrender.com";
   ```

3. **Run the Project:**
    ```bash
   npm run start
   ```
   The local service instance will be active on `http://localhost:5173`.

## ⏱️ Technical Presentation Note
This project communicates with an external backend hosted on Render's free tier. If the backend instance has been inactive for more than 15 minutes, it will automatically spin down to conserve cloud resources. On initial load during evaluation, please allow up to 60 seconds for the cloud server container to wake up. A visual spinning loading indicator has been engineered into the DOM layout to preserve user experience during this cold start.
