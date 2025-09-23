import { createContext, useState, useEffect, useCallback, useMemo } from "react";

export const PageContext = createContext({
  page: "",
  expensePage: () => {},
  incomePage: () => {},
});

export function PageContextProvider({ children }) {
  const [page, setPage] = useState(() => {
    return localStorage.getItem("page") || null;
  });

  const expensePage = useCallback(() => {
    setPage("Expense");
  }, []);
  const incomePage = useCallback(() => {
    setPage("Income");
  }, []);

  const pageContextCtx = useMemo(
    () => ({
      page,
      expensePage,
      incomePage,
    }),
    [page, expensePage, incomePage]
  );

  useEffect(() => {
    if (page) localStorage.setItem("page", page);
    else localStorage.removeItem("page");
  }, [page]);

  console.log(page);
  return (
    <PageContext.Provider value={pageContextCtx}>
      {children}
    </PageContext.Provider>
  );
}

export default PageContext;
