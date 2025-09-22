import { QueryClient } from "@tanstack/react-query";
import { authFetch } from "./refresh";

let baseUrl = "http://localhost:8000/api";

export const queryClient = new QueryClient();

export async function getCategories({ logout }) {
  const res = await authFetch(
    `${baseUrl}/addcategory/`,
    {
      method: "GET",
    },
    logout
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export async function postCategories({ title, description, type }) {
  const res = await authFetch(`${baseUrl}/addcategory/`, {
    method: "POST",
    body: JSON.stringify({ title, description, type }),
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
    body: JSON.stringify({ title: title, description: description }),
  });

  if (!res.ok) {
    throw new Error("Failed to add category");
  }

  return res.json();
}

export async function getCategory({ id }) {
  const res = await authFetch(`${baseUrl}/deletecategory/${id}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to add category");
  }

  return res.json();
}

export async function getExpenses({ logout }) {
  const res = await authFetch(
    `${baseUrl}/addexpense/`,
    {
      method: "GET",
    },
    logout
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export async function postExpense({ category, amount, date }) {
  const res = await authFetch(`${baseUrl}/addexpense/`, {
    method: "POST",
    body: JSON.stringify({ category, amount, date }),
  });

  if (!res.ok) {
    throw new Error("Failed to add category");
  }

  return res.json();
}

export async function putExpense({ category, amount, id, date }) {
  const res = await authFetch(`${baseUrl}/deleteexpense/${id}/`, {
    method: "PUT",
    body: JSON.stringify({ category, amount, date }),
  });

  if (!res.ok) {
    throw new Error("Failed to add category");
  }

  return res.json();
}

export async function deleteexpense({ id }) {
  const res = await authFetch(`${baseUrl}/deleteexpense/${id}/`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    throw new Error("Failed to add category");
  }

  return res.json();
}

export async function postIncome({ category, amount, date }) {
  const res = await authFetch(`${baseUrl}/addincome/`, {
    method: "POST",
    body: JSON.stringify({ category, amount, date }),
  });

  if (!res.ok) {
    throw new Error("Failed to add category");
  }

  return res.json();
}

export async function getIncomes({ logout }) {
  const res = await authFetch(
    `${baseUrl}/addincome/`,
    {
      method: "GET",
    },
    logout
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export async function putIncome({ category, amount, id, date }) {
  const res = await authFetch(`${baseUrl}/editincome/${id}/`, {
    method: "PUT",
    body: JSON.stringify({ category, amount, date }),
  });

  if (!res.ok) {
    throw new Error("Failed to add category");
  }

  return res.json();
}

export async function deleteIncome({ id }) {
  const res = await authFetch(`${baseUrl}/editincome/${id}/`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    throw new Error("Failed to add category");
  }

  return res.json();
}

export async function registerUser({ email, username, password }) {
  const res = await fetch(`${baseUrl}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, username, password }),
  });

  if (!res.ok) {
    throw new Error("Failed to add category");
  }

  return res.json();
}
