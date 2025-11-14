import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";

export default function MonthlyBarChart({ expenses }) {
  const monthlyData = Object.values(
    expenses.reduce((acc, item) => {
      const month = dayjs(item.date).format("MMM");
      acc[month] = acc[month] || { month, total: 0 };
      acc[month].total += Number(item.amount);
      return acc;
    }, {})
  );

  if (!monthlyData.length) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow mt-6">
      <h2 className="text-lg font-semibold mb-3">Monthly Spending</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
