import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";

export default function DailyLineChart({ expenses }) {
  const daily = expenses
    .map((item) => ({
      date: dayjs(item.date).format("DD MMM"),
      amount: Number(item.amount),
    }))
    .sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());

  if (!daily.length) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow mt-6">
      <h2 className="text-lg font-semibold mb-3">Expenses Over Time</h2>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={daily}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
