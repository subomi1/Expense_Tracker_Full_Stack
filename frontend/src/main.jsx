import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./store/AuthContext.jsx";
import { PageContextProvider } from "./store/PageContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <PageContextProvider>
        <App />
      </PageContextProvider>
    </AuthProvider>
  </StrictMode>
);
