import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#2563eb", "#10b981", "#f43f5e", "#f59e0b", "#6366f1"];

export default function CategoryPieChart({ expenses }) {
  const data = Object.values(
    expenses.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || { name: item.category, value: 0 };
      acc[item.category].value += Number(item.amount);
      return acc;
    }, {})
  );

  if (!data.length) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow mt-6">
      <h2 className="text-lg font-semibold mb-3">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
