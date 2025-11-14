import express from 'express';
import { addExpense, allExpenses, deleteExpense, updateExpense } from '../controller/expenses.controller.js';

const router = express.Router()

router.post("/",allExpenses);
router.post("/add",addExpense);
router.put("/:id",updateExpense);
router.delete("/:id",deleteExpense);

export default router