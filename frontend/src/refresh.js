export async function authFetch(url, options = {}) {
  let accessToken = JSON.parse(localStorage.getItem("access"));
  let refreshToken = JSON.parse(localStorage.getItem("refresh"));

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(url, options);

  if (response.status === 401 && refreshToken) {
    console.log("⚠️ Access token expired, trying refresh...");
    // try refresh
    const refreshResponse = await fetch("http://localhost:8000/api/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
      credentials: "include",
    });

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      accessToken = data.access;

      // update localStorage with new access token
      localStorage.setItem("access", JSON.stringify(accessToken));
      console.log("✅ New access token stored:", accessToken);

      // retry original request with new token
      options.headers.Authorization = `Bearer ${accessToken}`;
      response = await fetch(url, options);
    } else {
      // refresh also failed → log out user
      console.log("❌ Refresh token invalid/expired");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      throw new Error("Session expired, please login again");
    }
  }

  return response;
}
