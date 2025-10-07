import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Mainlayout from "./layout/Mainlayout";
import Homepage from "./pages/Homepage";
import ExpensesPage from "./pages/ExpensesPage";
import CategoriesPage from "./pages/CategoriesPage";
import IncomePage from "./pages/IncomePage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./http";

function App() {
  const routes = createRoutesFromElements(
    <Route path="/" element={<Mainlayout />}>
      <Route index element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Homepage />} />
      <Route path="/expenses" element={<ExpensesPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/income" element={<IncomePage />} />
      <Route path="/register" element={<Register />} />
    </Route>
  );
  const router = createBrowserRouter(routes);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
