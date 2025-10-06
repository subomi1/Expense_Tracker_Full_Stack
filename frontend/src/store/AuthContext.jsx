import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const [email, setEmail] = useState(() => {
    return JSON.parse(localStorage.getItem("email")) || null;
  });
  const [accessToken, setAccessToken] = useState(() => {
    return JSON.parse(localStorage.getItem("access")) || null;
  });
  const [refreshToken, setRefreshToken] = useState(() => {
    return JSON.parse(localStorage.getItem("refresh")) || null;
  });

  // keep state in sync with localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    if (email) localStorage.setItem("email", JSON.stringify(email));
    else localStorage.removeItem("email");
  }, [email]);

  useEffect(() => {
    if (accessToken)
      localStorage.setItem("access", JSON.stringify(accessToken));
    else localStorage.removeItem("access");
  }, [accessToken]);

  useEffect(() => {
    if (refreshToken)
      localStorage.setItem("refresh", JSON.stringify(refreshToken));
    else localStorage.removeItem("refresh");
  }, [refreshToken]);

  // ✅ login stores both access + refresh
  const login = async (identifier, password) => {
    try {
      const response = await fetch("https://expense-tracker-full-stack-h9sn.onrender.com/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: identifier, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setEmail(data.email);
        setUser(data.username);
        setAccessToken(data.access);
        setRefreshToken(data.refresh);

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
      const access = JSON.parse(localStorage.getItem("access"));
      await fetch("https://expense-tracker-full-stack-h9sn.onrender.com/logout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
        Authorization: `Bearer ${access}`,
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
    setUser(null);
    setEmail(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };

  console.log(accessToken);

  return (
    <AuthContext.Provider
      value={{ login, user, email, accessToken, refreshToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
