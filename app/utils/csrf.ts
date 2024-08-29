const API_URL = "https://d5f7-185-91-220-94.ngrok-free.app";
export async function getCsrf() {
  try {
    const response = await fetch(`${API_URL}/auth/token`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      return data.csrfToken;
    } else {
      throw new Error("Failed to fetch CSRF token");
    }
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    return null;
  }
}
