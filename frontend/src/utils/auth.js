// Utility to centralize auth header creation
export function getAuthHeaders() {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token") || localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function getAuthToken() {
  return localStorage.getItem("token") || sessionStorage.getItem("token") || localStorage.getItem("authToken");
}
