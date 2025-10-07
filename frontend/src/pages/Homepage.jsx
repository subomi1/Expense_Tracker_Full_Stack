import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Plus } from "lucide-react";
import { getExpenses, getIncomes } from "../http";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../store/AuthContext";
import { formatCurrency, generateColors } from "../utils";
import { Pie, Doughnut, Bar, Radar } from "react-chartjs-2";
import {
  Chart as CHARTJS,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import dayjs from "dayjs";

CHARTJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);
export default function Homepage() {
  const { logout, user } = useContext(AuthContext);
  const [selected, setSelected] = useState("expenses");
  const { data: ExpenseData } = useQuery({
    queryKey: ["expense"],
    queryFn: () => getExpenses({ logout }),
    enabled: !!user,
  });

  const { data: incomeData } = useQuery({
    queryKey: ["income"],
    queryFn: () => getIncomes({ logout }),
    enabled: !!user,
  });

  const currentMonthName = new Date().toLocaleString("default", {
    month: "long",
  });
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  console.log(ExpenseData);

  const monthlyExpenses = ExpenseData?.filter((exp) => {
    const expDate = new Date(exp.date);
    return (
      expDate.getMonth() === currentMonth &&
      expDate.getFullYear() === currentYear
    );
  });

  const monthlyIncome = incomeData?.filter((income) => {
    const expDate = new Date(income.date);
    return (
      expDate.getMonth() === currentMonth &&
      expDate.getFullYear() === currentYear
    );
  });
  console.log(monthlyIncome);

  const totalAmountIncome = monthlyIncome?.reduce((sum, income) => {
    return sum + Number(income.amount);
  }, 0);

  const totalAmountExpenses = monthlyExpenses?.reduce((sum, exp) => {
    return sum + Number(exp.amount);
  }, 0);

  let netCalculation;
  netCalculation = totalAmountIncome - totalAmountExpenses;

  const currentData = selected === "expenses" ? ExpenseData : incomeData;

  const groupedData =
    currentData?.reduce((acc, item) => {
      acc[item.category_name] = (acc[item.category_name] || 0) + item.amount;
      return acc;
    }, {}) || {}; // default to empty object if null

  const hasData = Object.keys(groupedData).length > 0;

  const data = hasData
    ? {
        labels: Object.keys(groupedData),
        datasets: [
          {
            data: Object.values(groupedData),
            backgroundColor: generateColors(currentData?.length),
          },
        ],
      }
    : null;

  const groupedByMonth =
    ExpenseData?.reduce((acc, item) => {
      const month = dayjs(item.date).format("YYYY-MM");
      acc[month] = (acc[month] || 0) + item.amount;
      return acc;
    }, {}) || {};

  const categories = Array.from(
    new Set([
      ...(ExpenseData?.map((e) => e.category_name) || []),
      ...(incomeData?.map((i) => i.category_name) || []),
    ])
  );

  const expensesGrouped = categories.map(
    (cat) =>
      ExpenseData?.filter((e) => e.category_name === cat).reduce(
        (sum, e) => sum + Number(e.amount),
        0
      ) || 0
  );

  const incomeGrouped = categories.map(
    (cat) =>
      incomeData
        ?.filter((i) => i.category_name === cat)
        .reduce((sum, i) => sum + Number(i.amount), 0) || 0
  );

  console.log(categories);
  const hasRadarData = categories.length > 0;

  const radarData = hasRadarData
    ? {
        labels: categories,
        datasets: [
          {
            label: "Expenses",
            data: expensesGrouped,
            backgroundColor: "rgba(61,53,46, 0.2)",
            borderColor: "rgb(61,53,46)",
            borderWidth: 2,
          },
          {
            label: "Income",
            data: incomeGrouped,
            backgroundColor: "rgba(205,175,148, 0.2)",
            borderColor: "rgb(205,175,148)",
            borderWidth: 2,
          },
        ],
      }
    : null;
  return (
    <div className="w-full">
      <Navbar name="Dashboard" />

      <main className="w-full p-3">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          <div className="bg-[#1E1E1E] min-h-[150px] p-3 sm:p-5 rounded-lg text-[#9ca3af] flex justify-between items-center gap-2 w-full lg:min-w-[250px] flex-wrap">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">Monthly Expense Summary</h1>
              <p
                className={
                  user
                    ? "text-4xl mb-3 font-bold text-[#EAEAEA]"
                    : "text-xl mb-3 font-bold mt-2 text-[#EAEAEA]"
                }
              >
                {user
                  ? formatCurrency(totalAmountExpenses)
                  : "Login to view your Expenses"}
              </p>
              <p className="text-sm">
                Total expenses for {currentMonthName} {currentYear}
              </p>
            </div>
          </div>
          <div className="bg-[#1E1E1E] min-h-[150px] p-3 sm:p-5 rounded-lg text-[#9ca3af] flex justify-between items-center gap-2 w-full lg:min-w-[250px] flex-wrap">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">Monthly Income Summary</h1>
              <p
                className={
                  user
                    ? "text-4xl mb-3 font-bold text-[#EAEAEA]"
                    : "text-xl mb-3 font-bold mt-2 text-[#EAEAEA]"
                }
              >
                {user
                  ? formatCurrency(totalAmountIncome)
                  : "Login to view your Income"}
              </p>
              <p className="text-sm">
                Total Income for {currentMonthName} {currentYear}
              </p>
            </div>
          </div>
          <div className="bg-[#1E1E1E] min-h-[150px] p-3 sm:p-5 rounded-lg text-[#9ca3af] flex justify-between items-center gap-2 w-full lg:min-w-[250px] flex-wrap">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">Monthly Net Summary</h1>
              <p
                className={
                  !user
                    ? "text-xl mb-3 font-bold mt-2 text-[#EAEAEA]"
                    : totalAmountExpenses > totalAmountIncome
                    ? "text-4xl mb-3 font-bold text-red-500"
                    : totalAmountIncome > totalAmountExpenses
                    ? "text-4xl mb-3 font-bold text-green-500"
                    : "text-4xl mb-3 font-bold text-[#EAEAEA]"
                }
              >
                {user
                  ? Number.isNaN(netCalculation)
                    ? "0"
                    : formatCurrency(netCalculation)
                  : "Login to view your Income"}
              </p>
              <p className="text-sm">
                Total Income for {currentMonthName} {currentYear}
              </p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex justify-center flex-col items-center">
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="border px-3 py-1 rounded-md self-start focus:outline-none mb-3 border-[#008080] text-[#008080] bg-black flex items-center"
            >
              <option value="expenses" className="bg-[#111] text-[#008080]">
                Expenses
              </option>
              <option value="income" className="text-[#008080] bg-black">Income</option>
            </select>
            <p className="font-semibold text-lg mb-3 self-start text-[#EAEAEA]">
              Categories for {selected}
            </p>
            <div className="h-[250px] w-[250px] lg:w-[350px]">
              {hasData && user ? (
                <Doughnut
                  key={selected + Object.keys(groupedData).join(",")}
                  data={data}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center font-semibold text-[#008080]">
                  <p>No Data Recieved Yet</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="h-[400px] w-full lg:min-w-[350px]">
              {hasRadarData && user ? (
                <Radar
                  key={selected + Object.keys(groupedByMonth).join(",")}
                  data={radarData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      tooltip: {
                        backgroundColor: "transparent",
                        titleColor: "#000",
                        bodyColor: "#000",
                        borderWidth: 0, // remove border
                        displayColors: false, // removes the colored box next to the label
                      },
                    },
                    legend: {
                      labels: {
                        usePointStyle: true,
                        pointStyle: false,
                      },
                    },

                    scales: {
                      r: {
                        pointLabels: {
                          color: "#3D352E",
                          backdropColor: "transparent",
                          font: {
                            size: 9,
                            weight: 400,
                          },
                        },
                        ticks: {
                          color: "#3D352E",
                          backdropColor: "transparent",
                          font: {
                            size: 9,
                            weight: 400,
                          },
                        },
                      },
                    },
                  }}
                />
              ) : !user ? (
                <div className="w-full h-full flex flex-col justify-center items-center font-semibold text-[#008080]">
                  <p>No Data Recieved Yet</p>
                  <Link
                    to="/login"
                    className="cursor-pointer bg-[#008080]/30 text-[#008080] px-5 py-2 rounded-md font-semibold hover:text-[#008080] border-1 border-black duration-300 ease-in-out hover:border-1 hover:border-[#008080] hover:bg-transparent mt-3 text-xs md:text-sm"
                  >
                    Login
                  </Link>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center font-semibold text-[#008080]">
                  <p>No Data Recieved Yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
