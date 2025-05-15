// auth.js
const BASE_URL = "https://backend-adit-377407893329.us-central1.run.app/api";

function checkAuth() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    window.location.href = "index.html";
    return false;
  }
  return token;
}

function authFetch(url, options = {}) {
  const token = checkAuth();
  if (!token) return Promise.reject("Unauthorized");
  
  const defaultOptions = {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  };
  
  return fetch(`${BASE_URL}${url}`, {...defaultOptions, ...options})
    .then(response => {
      if (response.status === 401) {
        localStorage.removeItem("accessToken");
        window.location.href = "index.html";
        return Promise.reject("Session expired");
      }
      return response;
    });
}