import Navbar from "../components/Navbar";
import { useEffect, useContext } from "react";
import PageContext from "../store/PageContext";
import ExpensesAndIncomeDetail from "../components/ExpenseAndIncomeDetail";

export default function IncomePage() {
  const { incomePage, page } = useContext(PageContext);
  useEffect(() => {
    incomePage();
  }, [incomePage]);
  return (
    <div className="w-full">
      <ExpensesAndIncomeDetail/>
    </div>
  );
}
