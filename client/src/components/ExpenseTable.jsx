import { Button } from "@/components/ui/button";

const ExpenseTable = ({ expenses, handleDelete }) => {
  return (
    <div className="mt-6 p-4 bg-white shadow rounded-lg">
      <h3 className="text-xl font-semibold mb-3">Recent Expenses</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((exp) => (
              <tr key={exp._id} className="border-b">
                <td className="p-2">{exp.title}</td>
                <td className="p-2">₹{exp.amount}</td>
                <td className="p-2">{exp.category}</td>
                <td className="p-2">{exp.date?.split("T")[0]}</td>
                <td className="p-2 text-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(exp._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {expenses.length === 0 && (
          <p className="text-center text-gray-500 py-4">No expenses found</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseTable;
