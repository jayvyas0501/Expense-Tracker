import { Button } from "@/components/ui/button";

import CategoryPieChart from "@/components/charts/CategoryPieChart";
import MonthlyBarChart from "@/components/charts/MonthlyBarChart";
import DailyLineChart from "@/components/charts/DailyLineChart";

import api from "@/lib/axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await api.get("/expenses", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(data.expenses);
    } catch (err) {
      console.log("Error fetching expenses:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-white p-4 shadow flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard Analytics</h1>

        <Button variant="secondary" onClick={() => (window.location.href = "/")}>
          ← Back to Home
        </Button>
      </div>

      <div className="max-w-5xl mx-auto p-6">

        {/* CHART 1 */}
        <CategoryPieChart expenses={expenses} />

        {/* CHART 2 */}
        <MonthlyBarChart expenses={expenses} />

        {/* CHART 3 */}
        <DailyLineChart expenses={expenses} />

        {/* If no expenses */}
        {expenses.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No expenses yet — add some from the Home page.
          </p>
        )}
      </div>
    </div>
  );
}
