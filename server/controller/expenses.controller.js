import Expense from "../schema/Expense.js"

export const addExpense = async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;

        const user = req.userId;

        if (!title || !amount || !category || !date)
            return res.status(400).json({ message: "All fields are required" });

        const expense = await Expense.create({ title, amount, category, date, user });
        res.status(201).json({ message: "Expense added successfully", expense });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const allExpenses = async (req, res) => {
  try {
    // const { date } = req.query;

    const filter = { user: req.userId };

    // if (date) {
    //   const selected = new Date(date);
    //   const nextDay = new Date(date);
    //   nextDay.setDate(nextDay.getDate() + 1);

    //   filter.date = {
    //     $gte: selected,
    //     $lt: nextDay
    //   };
    // }

    const expenses = await Expense.find(filter);

    // Simple sum without aggregation
    const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    res.status(200).json({
      message: "Expenses fetched successfully",
      totalAmount,
      expenses,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount, category, date } = req.body;

        const expense = await Expense.findByIdAndUpdate(
            id,
            { title, amount, category, date },
            { new: true, runValidators: true }
        );

        if (!expense) return res.status(404).json({ message: "Expense not found" });

        res.status(200).json({ message: "Expense updated successfully", expense });
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}

export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findByIdAndDelete(id);

        if (!expense) return res.status(404).json({ message: "Expense not found" });

        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}