import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(
  Number(localStorage.getItem("budget")) || 15000
);
  

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");
  const [editingId, setEditingId] = useState(null);

  const email = localStorage.getItem("email");

  const totalIncome = expenses
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = expenses
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpense;

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/expenses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setExpenses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addExpense = async () => {
  try {
    const token = localStorage.getItem("token");

    if (editingId) {
      await axios.put(
        `http://localhost:5000/api/expenses/${editingId}`,
        {
          title,
          amount: Number(amount),
          category,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      await axios.post(
        "http://localhost:5000/api/expenses",
        {
          title,
          amount: Number(amount),
          category,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    setTitle("");
    setAmount("");
    setCategory("");
    setType("expense");
    setEditingId(null);

    fetchExpenses();
  } catch (error) {
    console.log(error);
  }
};

  const editExpense = (expense) => {
  setTitle(expense.title);
  setAmount(expense.amount);
  setCategory(expense.category);
  setType(expense.type);
  setEditingId(expense._id);
};

  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/expenses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/expenses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setExpenses(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadExpenses();
  }, []);
const categoryTotals = {};

expenses
  .filter((item) => item.type === "expense")
  .forEach((item) => {
    categoryTotals[item.category] =
      (categoryTotals[item.category] || 0) +
      item.amount;
  });

const categoryData = Object.keys(categoryTotals).map(
  (category) => ({
    name: category,
    value: categoryTotals[category],
  })
);

const saveBudget = () => {
  localStorage.setItem("budget", budget);
  alert("Budget saved successfully!");
};
const downloadExpenses = () => {
  const csvRows = [];

  csvRows.push(
    ["Title", "Amount", "Category", "Type"]
  );

  expenses.forEach((expense) => {
    csvRows.push([
      expense.title,
      expense.amount,
      expense.category,
      expense.type,
    ]);
  });

  const csvContent = csvRows
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob(
    [csvContent],
    { type: "text/csv" }
  );

  const url = window.URL.createObjectURL(
    blob
  );

  const a = document.createElement("a");

  a.href = url;
  a.download = "expenses.csv";

  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);

  window.URL.revokeObjectURL(url);
};
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      {/* Top 4 Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {/* Card 1 */}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#e7f1f3",
          }}
        >
          <img
            src="https://i.pravatar.cc/150"
            alt="profile"
            width="100"
            height="100"
            style={{
              borderRadius: "50%",
              marginBottom: "10px",
            }}
          />

          <h2>User Profile</h2>

          <p>{email}</p>
        </div>

        {/* Card 2 */}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            backgroundColor: "#e7f1f3",
          }}
        >
          <h2>Financial Summary</h2>

          <p>
            <strong>💰 Total Balance:</strong> ₹{balance}
          </p>

          <p>
            <strong>📈 Total Income:</strong> ₹{totalIncome}
          </p>

          <p>
            <strong>📉 Total Expenses:</strong> ₹{totalExpense}
          </p>

          <p>
            <strong>Total Transactions:</strong> {expenses.length}
          </p>
        </div>

        {/* Card 3 */}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            backgroundColor: "#e7f1f3",
          }}
        >
          <h2>Budget Management</h2>

<div style={{ marginBottom: "15px" }}>
  <input
    type="number"
    placeholder="Enter Monthly Budget"
    value={budget}
    onChange={(e) =>
      setBudget(Number(e.target.value))
    }
    style={{
      marginRight: "10px",
      padding: "5px",
    }}
  />

  <button onClick={saveBudget}>
    Save Budget
  </button>
</div>

<p>
  <strong>Budget:</strong> ₹{budget}
</p>

<p>
  <strong>Spent:</strong> ₹{totalExpense}
</p>

<p>
  <strong>Remaining:</strong> ₹
  {budget - totalExpense}
</p>

{totalExpense > budget && (
  <p
    style={{
      color: "red",
      fontWeight: "bold",
    }}
  >
    ⚠ Budget limit exceeded!
  </p>
)}
<div style={{ marginTop: "20px" }}>
  <button
    onClick={downloadExpenses}
    style={{
      padding: "10px 15px",
      cursor: "pointer",
    }}
  >
    ⬇ Download Expenses
  </button>
</div>
        </div>

      {/* Card 4 */}
<div
  style={{
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#e7f1f3",
  }}
>
  <h2>Expense Analytics</h2>

  {categoryData.length > 0 ? (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <PieChart>
        <Pie
          data={categoryData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {categoryData.map((_, index) => (
            <Cell key={index} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  ) : (
    <p>No expense data available</p>
  )}
</div>
</div>

      {/* Card 5 */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          marginTop: "30px",
          backgroundColor: "#e7f1f3",
        }}
      >
        <h2>Expense Management</h2>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            style={{ marginRight: "10px" }}
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            style={{ marginRight: "10px" }}
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            style={{ marginRight: "10px" }}
          />

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
            style={{ marginRight: "10px" }}
          >
            <option value="expense">
              Expense
            </option>
            <option value="income">
              Income
            </option>
          </select>

          <button onClick={addExpense}>
            {editingId ? "Update Expense" : "Add Expense"}
          </button>
        </div>

        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id}>
                <td>{expense.title}</td>
                <td>₹{expense.amount}</td>
                <td>{expense.category}</td>
                <td>{expense.type}</td>
                <td>
  <button
    onClick={() => editExpense(expense)}
    style={{ marginRight: "10px" }}
  >
    Edit
  </button>

  <button
    onClick={() =>
      deleteExpense(expense._id)
    }
  >
    Delete
  </button>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;