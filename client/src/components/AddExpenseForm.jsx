import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem
} from "@/components/ui/select";

const AddExpenseForm = ({
  title, amount, category, date,
  setTitle, setAmount, setCategory, setDate,
  handleAddExpense
}) => {
  return (
    <div className="mt-6 p-4 bg-white shadow rounded-lg">
      <h3 className="text-xl font-semibold mb-3">Add Expense</h3>

      <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <Label>Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div>
          <Label>Amount</Label>
          <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>

        <div>
          <Label>Category</Label>
          <Select onValueChange={setCategory} defaultValue={category}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Travel">Travel</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Bills">Bills</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Date</Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>

        <div className="md:col-span-2 flex justify-end mt-2">
          <Button type="submit">Add Expense</Button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;
