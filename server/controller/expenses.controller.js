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
    const { category, startDate, endDate, sort } = req.body.params || {};

    const filter = { user: req.userId };

    if (category && category !== "All") {
      filter.category = category;
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.date.$lte = end;
      }
    }

    console.log(filter)

    let query = Expense.find(filter);

    if (sort) {
      const sortOption = {};
      if (sort.startsWith("-")) {
        sortOption[sort.substring(1)] = -1;
      } else {
        sortOption[sort] = 1;
      }
      query = query.sort(sortOption);
    }

    const expenses = await query;

    const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    res.status(200).json({
      message: "Expenses fetched",
      totalAmount,
      expenses
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