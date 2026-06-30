"use client";
import React, { useEffect, useState } from "react";
import { ExpenseItem } from "../../lib/types";

const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [newExpense, setNewExpense] = useState<ExpenseItem>({
    id: 0,
    title: "",
    amount: 0,
    category: "",
    date: "",
  });

  // Load from API
  useEffect(() => {
    fetch("/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, []);

  const handleAddItem = async () => {
    if (!newExpense.title || !newExpense.amount) return;
    const itemToAdd = { ...newExpense, id: expenses.length + 1 };

    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemToAdd),
    });

    if (res.ok) {
      await fetch("/api/expenses")
        .then((res) => res.json())
        .then((data) => setExpenses(data));
      setNewExpense({ id: 0, title: "", amount: 0, category: "", date: "" });
    }
  };

  const handleRemoveItem = async (id: number) => {
    const res = await fetch(`/api/expenses`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      await fetch("/api/expenses")
        .then((res) => res.json())
        .then((data) => setExpenses(data));
    }
  };

  return (
    <main className="min-h-screen bg-pink-50 p-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Expenses</h1>

      {/* Add Expense Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={newExpense.title}
            onChange={(e) =>
              setNewExpense({ ...newExpense, title: e.target.value })
            }
            className="border rounded p-2"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={(e) =>
              setNewExpense({ ...newExpense, amount: Number(e.target.value) })
            }
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Category"
            value={newExpense.category}
            onChange={(e) =>
              setNewExpense({ ...newExpense, category: e.target.value })
            }
            className="border rounded p-2"
          />
          <input
            type="date"
            value={newExpense.date}
            onChange={(e) =>
              setNewExpense({ ...newExpense, date: e.target.value })
            }
            className="border rounded p-2"
          />
        </div>
        <button
          onClick={handleAddItem}
          className="mt-4 px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
        >
          Add
        </button>
      </div>

      {/* Expense List */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Expense List</h2>
        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses added yet.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-pink-100">
                <th className="border p-2">Title</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="text-center">
                  <td className="border p-2">{expense.title}</td>
                  <td className="border p-2">₹{expense.amount}</td>
                  <td className="border p-2">{expense.category}</td>
                  <td className="border p-2">{expense.date}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleRemoveItem(expense.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      x
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
};

export default ExpensesPage;
