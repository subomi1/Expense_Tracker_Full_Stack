import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Load from localStorage if available
    const storedAuth = localStorage.getItem("auth");
    return storedAuth
      ? JSON.parse(storedAuth)
      : { user: null, email: null, accessToken: null };
  });

  // Keep localStorage in sync with state
  useEffect(() => {
    if (auth.user) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();

        const newAuth = {
          user: data.username,
          email: data.email,
          accessToken: data.access,
        };

        setAuth(newAuth); // React state
        localStorage.setItem("auth", JSON.stringify(newAuth)); // Persistent storage

        return true;
      } else {
        console.log("Login failed");
        return false;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({}),
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }

    setAuth({ user: null, email: null, accessToken: null });
    localStorage.removeItem("auth");
  };
  console.log("New access token:", auth.accessToken);

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
