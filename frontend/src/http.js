import { QueryClient } from "@tanstack/react-query";
import { authFetch } from "./refresh";

export const queryClient = new QueryClient();

export async function getCategories() {
  const res = await authFetch("http://localhost:8000/api/addcategory", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}
