import { useEffect, useState } from "react";
import api from "../lib/axios";

import AddExpenseForm from "@/components/AddExpenseForm";
import Filters from "@/components/Filters";
import ExpenseTable from "@/components/ExpenseTable";
import SummaryCards from "@/components/SummaryCards";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Add expense states
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");
  const [date, setDate] = useState("");

  // Filters
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState(""); // only one date filter
  const [sort, setSort] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // FIXED fetch
  const fetchExpenses = async () => {
    try {
      const params = {};

      if (filterCategory) params.category = filterCategory;
      if (filterDate) params.startDate = filterDate; // only one
      if (sort) params.sort = sort;

      const { data } = await api.post("/expenses", { params });

      setExpenses(data.expenses);
      setTotalAmount(data.totalAmount);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();

    try {
      await api.post("/expenses", {
        title,
        amount,
        category,
        date,
      });

      setTitle("");
      setAmount("");
      setCategory("Other");
      setDate("");

      fetchExpenses();
    } catch (error) {
      alert("Error adding expense");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white p-4 shadow flex justify-between">
        <h1 className="text-xl font-bold">Expense Tracker</h1>
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="max-w-4xl mx-auto p-5 space-y-6">
        <SummaryCards totalAmount={totalAmount} count={expenses.length} />

        <AddExpenseForm
          title={title}
          amount={amount}
          category={category}
          date={date}
          setTitle={setTitle}
          setAmount={setAmount}
          setCategory={setCategory}
          setDate={setDate}
          handleAddExpense={handleAddExpense}
        />

        {/* Filters + Table grouped closer */}
        <Filters
          filterCategory={filterCategory}
          filterDate={filterDate}
          sort={sort}
          setFilterCategory={setFilterCategory}
          setFilterDate={setFilterDate}
          setSort={setSort}
          fetchExpenses={fetchExpenses}
        />

        <ExpenseTable expenses={expenses} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Home;
