const SummaryCards = ({ totalAmount, count }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-white shadow rounded-lg">Total: ₹{totalAmount}</div>
      <div className="p-4 bg-white shadow rounded-lg">Expenses: {count}</div>
      <div className="p-4 bg-white shadow rounded-lg">User: Logged In</div>
    </div>
  );
};

export default SummaryCards;
