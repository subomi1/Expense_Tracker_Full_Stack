import { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Plus, SquarePen, Trash2, X } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  getExpenses,
  getCategories,
  postExpense,
  putExpense,
  queryClient,
  deleteexpense,
  postIncome,
  getIncomes,
  putIncome,
  deleteIncome,
} from "../http";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import Modal from "../UI/Modal";
import CurrencyInput from "react-currency-input-field";
import PageContext from "../store/PageContext";

export default function ExpensesAndIncomeDetail() {
  const { logout, user } = useContext(AuthContext);
  const { page } = useContext(PageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isPutOpen, setIsPutOpen] = useState(false);
  const [putData, setPutData] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [value, setValue] = useState("");

  const { data: expData } = useQuery({
    queryKey: ["expense"],
    queryFn: () => getExpenses({ logout }),
    enabled: !!user,
  });
  const { data: incomeData } = useQuery({
    queryKey: ["income"],
    queryFn: () => getIncomes({ logout }),
    enabled: !!user,
  });
  const { data: catData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories({ logout }),
    enabled: !!user,
  });

  console.log(incomeData);

  const { mutate: mutateAddExpense } = useMutation({
    mutationFn: postExpense,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["expense"]);
      setIsOpen(false);
      setSelectedCategoryId(null);
    },
  });

  const { mutate: mutateAddIncome } = useMutation({
    mutationFn: postIncome,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["income"]);
      setIsOpen(false);
      setSelectedCategoryId(null);
    },
  });

  const { mutate: mutatePutExpense } = useMutation({
    mutationFn: putExpense,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["expense"]);
      setIsPutOpen(false);
    },
  });

  const { mutate: mutatePutIncome } = useMutation({
    mutationFn: putIncome,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["expense"]);
      setIsPutOpen(false);
    },
  });

  const { mutate: mutateDeleteExpense } = useMutation({
    mutationFn: deleteexpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expense"]);
    },
  });

  const { mutate: mutateDeleteIncome } = useMutation({
    mutationFn: deleteIncome,
    onSuccess: () => {
      queryClient.invalidateQueries(["income"]);
    },
  });

  function handleSubmitAddExpense(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const date = fd.get("date");
    mutateAddExpense({
      amount: value,
      date: date,
      category: selectedCategoryId,
    });
  }

  function handleSubmitAddIncome(event) {
    console.log("handling...");
    event.preventDefault();
    const fd = new FormData(event.target);
    const date = fd.get("date");
    mutateAddIncome({
      amount: value,
      date: date,
      category: selectedCategoryId,
    });
  }

  function handleSubmitExpensePut(event) {
    event.preventDefault();
    mutatePutExpense({
      id: putData.id,
      category: selectedCategoryId,
      amount: value,
      date: putData.date,
    });
  }

  function handleSubmitIncomePut(event) {
    event.preventDefault();
    mutatePutIncome({
      id: putData.id,
      category: selectedCategoryId,
      amount: value,
      date: putData.date,
    });
  }

  function handleOpenPutModal(row) {
    setPutData(row);
    setIsPutOpen(true);
    setSelectedCategoryId(row.category);
    setValue(row.amount);
    console.log(selectedCategoryId);
    console.log(row);
  }

  function handleDeleteExpense(id) {
    mutateDeleteExpense({ id: id });
  }

  function handleDeleteIncome(id) {
    mutateDeleteIncome({ id: id });
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  const catExpenseOrIncomeData = catData?.filter((cat) => cat.type === page);
  console.log(catExpenseOrIncomeData);

  const { expensePage } = useContext(PageContext);
  useEffect(() => {
    expensePage();
  }, [expensePage]);

  let content;

  if (page && user) {
    content = (
      <tbody className="bg-white [&>tr>td]:align-middle">
        {(page === "Income" ? incomeData : expData)?.map((row, index) => (
          <tr
            key={index}
            className="border-b border-white/10 hover:bg-[#2b2b2b] transition text-[10px] sm:text-[14px] text-[#FBF9FF] bg-[#1E1E1E] duration-300 ease-in-out"
          >
            <td className="md:p-3 p-1">{row.date}</td>
            <td className="md:p-3 p-1">
              <span
                className="px-1 md:px-3 py-0.5 md:py-1 text-[10px] sm:text-xs md:text-sm rounded-lg bg-[#008080]/30 text-[#008080] truncate max-w-[80px] inline-block cursor-pointer"
                title={row.category_name}
              >
                {row.category_name}
              </span>
            </td>
            <td className="md:p-3 p-1">
              <span
                className={`
      flex items-center font-medium
      text-[12px] sm:text-sm md:text-base
      ${page === "Income" ? "text-green-400" : "text-red-500"}
    `}
              >
                {page === "Income" ? "+" : "-"}
                {formatCurrency(row.amount)}
              </span>
            </td>
            <td className="md:p-3 p-1">
              <div className="flex items-center gap-2 w-full justify-center">
                <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
                  <SquarePen
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    onClick={() => handleOpenPutModal(row)}
                  />
                </button>
                <button className="text-red-500 hover:text-red-700 cursor-pointer mt-[-2px]">
                  <Trash2
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    onClick={
                      page === "Income"
                        ? () => handleDeleteIncome(row.id)
                        : () => handleDeleteExpense(row.id)
                    }
                  />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
  return (
    <div className="w-full">
      <Navbar name={page} />
      <div className="w-full overflow-x-auto p-3">
        {isPutOpen && (
          <Modal isOpen={isPutOpen} onClose={() => setIsPutOpen(false)}>
            <div className="flex justify-end w-full mb-8">
              <X onClick={() => setIsPutOpen(false)} />
            </div>
            <form
              action=""
              onSubmit={
                page === "Income"
                  ? handleSubmitIncomePut
                  : handleSubmitExpensePut
              }
            >
              <div className="flex flex-col mb-8">
                <label htmlFor="" className="mb-3">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={putData.date}
                  readOnly={putData.date}
                  className="border-[1px] rounded-md  border-[#A8A2A3] px-4 py-2 focus:outline-0"
                />
              </div>
              <div className="flex flex-col mb-8">
                <label htmlFor="" className="mb-3">
                  Amount
                </label>
                <CurrencyInput
                  id="budget-amount"
                  name="amount"
                  placeholder="Enter amount"
                  prefix="₦"
                  decimalsLimit={2}
                  allowNegativeValue={false}
                  defaultValue={value}
                  onValueChange={(value, name, values) => {
                    console.log("Raw:", value);
                    setValue(value);
                    console.log("Formatted:", values.formattedValue);
                  }}
                  className="border-[1px] rounded-md  border-[#A8A2A3] px-4 py-2 focus:outline-0"
                />
              </div>
              <div className="flex flex-col mb-8">
                <label htmlFor="" className="mb-3">
                  Category
                </label>
                <div className="flex gap-2 flex-wrap">
                  {catExpenseOrIncomeData?.map((cat) => (
                    <label
                      key={cat.id}
                      className={
                        cat.id === selectedCategoryId
                          ? "px-3 py-2 rounded-2xl border-[2px] border-[#A8A2A3] bg-sky-400"
                          : "px-3 py-2 rounded-2xl border-[2px] border-[#A8A2A3]"
                      }
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat.title}
                        onChange={() => setSelectedCategoryId(cat.id)}
                        checked={selectedCategoryId === cat.id}
                        className="hidden"
                      />
                      {cat.title}
                    </label>
                  ))}
                </div>
              </div>
              <div className="w-full flex justify-end">
                <button
                  type="submit"
                  className="cursor-pointer bg-amber-950 px-5 py-2 text-[#CDAF94] rounded-md font-semibold"
                >
                  submit
                </button>
              </div>
            </form>
          </Modal>
        )}
        {isOpen && (
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="flex justify-end w-full mb-8">
              <X
                onClick={() => setIsOpen(false)}
                className="hover:cursor-pointer"
              />
            </div>
            <form
              action=""
              onSubmit={
                page === "Income"
                  ? handleSubmitAddIncome
                  : handleSubmitAddExpense
              }
            >
              <div className="flex flex-col mb-8">
                <label htmlFor="" className="mb-3">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  className="border-[1px] rounded-md  border-[#A8A2A3] px-4 py-2 focus:outline-0"
                />
              </div>
              <div className="flex flex-col mb-8">
                <label htmlFor="" className="mb-3">
                  Amount
                </label>
                <CurrencyInput
                  id="budget-amount"
                  name="amount"
                  placeholder="Enter amount"
                  prefix="₦"
                  decimalsLimit={2}
                  allowNegativeValue={false}
                  onValueChange={(value, name, values) => {
                    console.log("Raw:", value);
                    setValue(value); // e.g. 5000
                    console.log("Formatted:", values.formattedValue); // ₦5,000.00
                  }}
                  className="border-[1px] rounded-md  border-[#A8A2A3] px-4 py-2 focus:outline-0"
                />
              </div>
              <div className="flex flex-col mb-8">
                <label htmlFor="" className="mb-3">
                  Category
                </label>
                <div className="flex gap-2">
                  {catExpenseOrIncomeData.map((cat) => (
                    <label
                      key={cat.id}
                      className={
                        cat.id === selectedCategoryId
                          ? "px-3 py-2 rounded-2xl border-[2px] border-[#A8A2A3] bg-sky-400"
                          : "px-3 py-2 rounded-2xl border-[2px] border-[#A8A2A3]"
                      }
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat.title}
                        onChange={() => setSelectedCategoryId(cat.id)}
                        checked={selectedCategoryId === cat.id}
                        className="hidden"
                      />
                      {cat.title}
                    </label>
                  ))}
                </div>
              </div>

              <div className="w-full flex justify-end">
                <button
                  type="submit"
                  className="cursor-pointer bg-[#008080]/30 text-[#008080] px-5 py-2 rounded-md font-semibold hover:text-[#008080] border-1 border-black duration-300 ease-in-out hover:border-1 hover:border-[#008080] hover:bg-transparent"
                >
                  submit
                </button>
              </div>
            </form>
          </Modal>
        )}
        <div className="w-full flex justify-end mb-3">
          <button
            className="flex items-center bg-[#008080]/30 text-[#008080] py-1 px-3 rounded-md cursor-pointer md:py-2 md:px-5 md:text-[16px] text-xs gap-1 hover:bg-black hover:text-[#008080] border-1 border-black duration-300 ease-in-out hover:border-1 hover:border-[#008080]"
            onClick={() => {
              if (!user) {
                alert("Please log in first!");
                return;
              }
              setIsOpen(true);
            }}
          >
            <Plus size={18} />
            <span className="">{`Add ${page}`}</span>
          </button>
        </div>
        <table className="w-full border-collapse rounded-2xl overflow-hidden table-auto">
          <thead>
            <tr className="bg-[#1E1E1E] text-[#FBF9FF] text-left text-[10px] md:text-[15px] border-b border-white/10">
              <th className="p-3 font-medium">Date</th>
              <th className="p-3 font-medium">Category</th>
              <th className="p-3 font-medium">Amount</th>
              <th className="p-3 font-medium text-center">Options</th>
            </tr>
          </thead>
          {content}
        </table>
        {!user ? (
          <div className="w-full flex flex-col items-center justify-center mt-[130px]">
            <p className="font-bold text-[#008080]">
              Login to view your {page} Details
            </p>
            <Link
              to="/login"
              className="cursor-pointer bg-[#008080]/30 text-[#008080] px-5 py-2 rounded-md font-semibold hover:text-[#008080] border-1 border-black duration-300 ease-in-out hover:border-1 hover:border-[#008080] hover:bg-transparent mt-3"
            >
              Login
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
