import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue
} from "@/components/ui/select";

const EditExpenseModal = ({
  open, setOpen, editedExpense,
  setEditedExpense, handleUpdateExpense
}) => {
  if (!editedExpense) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <Label>Title</Label>
            <Input
              value={editedExpense.title}
              onChange={(e) =>
                setEditedExpense({ ...editedExpense, title: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Amount</Label>
            <Input
              type="number"
              value={editedExpense.amount}
              onChange={(e) =>
                setEditedExpense({ ...editedExpense, amount: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Category</Label>
            <Select
              value={editedExpense.category}
              onValueChange={(v) =>
                setEditedExpense({ ...editedExpense, category: v })
              }
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Date</Label>
            <Input
              type="date"
              value={editedExpense.date?.slice(0, 10)}
              onChange={(e) =>
                setEditedExpense({ ...editedExpense, date: e.target.value })
              }
            />
          </div>

          <Button className="w-full" onClick={handleUpdateExpense}>
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditExpenseModal;
