import { QueryClient } from "@tanstack/react-query";
import { authFetch } from "./refresh";

let baseUrl = "http://localhost:8000/api";

export const queryClient = new QueryClient();

export async function getCategories({ logout }) {
  const res = await authFetch(`${baseUrl}/addcategory/`, {
    method: "GET",
  }, logout);

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export async function postCategories({ title, description }) {
  const res = await authFetch(`${baseUrl}/addcategory/`, {
    method: "POST",
    body: JSON.stringify({ title, description }),
  });

  if (!res.ok) {
    throw new Error("Failed to add category");
  }

  return res.json();
}

export async function deleteCategories({ id }) {
  const res = await authFetch(`${baseUrl}/deletecategory/${id}/`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    throw new Error("Failed to add category");
  }

  return res.json();
}

export async function putCategories({ title, description, id }) {
  const res = await authFetch(`${baseUrl}/deletecategory/${id}/`, {
    method: "PUT",
    body: JSON.stringify({ title:title, description: description }),
  });

  if (!res.ok) {
    throw new Error("Failed to add category");
  }

  return res.json();
}

export async function getCategory({ id }) {
    const res = await authFetch(`${baseUrl}/deletecategory/${id}`, {
    method: "GET"
  });

  if (!res.ok) {
    throw new Error("Failed to add category");
  }

  return res.json();
}
