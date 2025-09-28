import Navbar from "../components/Navbar";
import { useEffect, useContext } from "react";
import PageContext from "../store/PageContext";
import ExpensesAndIncomeDetail from "../components/ExpenseAndIncomeDetail";

export default function IncomePage() {
  const { expensePage } = useContext(PageContext)
  useEffect(() => {
    expensePage();
  }, [expensePage]);
  return (
    <div className="w-full">
      <ExpensesAndIncomeDetail />
    </div>
  );
}
