// SummaryCards.jsx
const SummaryCards = ({ totalAmount, count, user }) => {
  // console.log(user)
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-white shadow rounded-lg">
        Total: ₹{totalAmount}
      </div>
      <div className="p-4 bg-white shadow rounded-lg">
        Expenses: {count}
      </div>
      <div className="p-4 bg-white shadow rounded-lg">
        User: {user ? `${user.name} (${user.email})` : "Logged In"}
      </div>
    </div>
  );
};

export default SummaryCards;
