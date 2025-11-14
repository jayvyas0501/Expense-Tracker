import { useEffect, useState } from "react";
import api from "../lib/axios";
import EditExpenseModal from "@/components/EditExpenseModal";
import AddExpenseForm from "@/components/AddExpenseForm";
import Filters from "@/components/Filters";
import ExpenseTable from "@/components/ExpenseTable";
import SummaryCards from "@/components/SummaryCards";
import { Button } from "@/components/ui/button";

const Home = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchExpenses();
  }, []);

  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Add expense states
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");
  const [date, setDate] = useState("");

  // Filters
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [sort, setSort] = useState(""); // e.g., "date" or "-amount"


  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedExpense, setEditedExpense] = useState(null);

  const handleEdit = (expense) => {
    setEditedExpense(expense);
    setEditModalOpen(true);
  };

  const handleUpdateExpense = async () => {
    try {
      await api.put(`/expenses/${editedExpense._id}`, editedExpense);
      setEditModalOpen(false);
      fetchExpenses();
    } catch (err) {
      alert("Update failed");
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };


  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const params = {};

      if (filterCategory) params.category = filterCategory;
      if (filterStartDate) params.startDate = filterStartDate;
      if (filterEndDate) params.endDate = filterEndDate;
      if (sort) params.sort = sort;

      const { data } = await api.post(
        "/expenses",
        { params },
        { headers: { Authorization: `Bearer ${token}` } }
      );


      setExpenses(data.expenses);
      setTotalAmount(data.totalAmount);
    } catch (error) {
      console.log(error);
    }
  };


  const handleAddExpense = async (e) => {
    e.preventDefault();

    try {
      await api.post("/expenses/add", {
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
      <div className="bg-white p-4 shadow flex justify-between items-center">
        <h1 className="text-xl font-bold">Expense Tracker</h1>
        <div className="flex gap-2">
          {/* Dashboard Button */}
          <Button variant="default" onClick={() => window.location.href = "/dashboard"}>
            Dashboard
          </Button>

          {/* Logout Button */}
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>


      <div className="max-w-4xl mx-auto p-5 space-y-6">
        <SummaryCards totalAmount={totalAmount} count={expenses.length} user={user} />


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
          filterStartDate={filterStartDate}
          filterEndDate={filterEndDate}
          sort={sort}
          setFilterCategory={setFilterCategory}
          setFilterStartDate={setFilterStartDate}
          setFilterEndDate={setFilterEndDate}
          setSort={setSort}
          fetchExpenses={fetchExpenses}
        />


        <ExpenseTable expenses={expenses} handleDelete={handleDelete} handleEdit={handleEdit} />

        <EditExpenseModal
          open={editModalOpen}
          setOpen={setEditModalOpen}
          editedExpense={editedExpense}
          setEditedExpense={setEditedExpense}
          handleUpdateExpense={handleUpdateExpense}
        />
      </div>
    </div>
  );
};

export default Home;
