"use client";
import React, { useEffect, useState } from "react";
import { Savings } from "../../lib/types";

const SavingsPage: React.FC = () => {
  const [savings, setSavings] = useState<Savings[]>([]);
  const [newSavings, setNewSavings] = useState<Savings>({
    id: 0,
    title: "",
    amount: 0,
    category: "",
    date: "",
  });

  // Load from API
  useEffect(() => {
    fetch("/api/savings")
      .then((res) => res.json())
      .then((data) => setSavings(data));
  }, []);

  const handleAddItem = async () => {
    if (!newSavings.date || !newSavings.amount) return;
    const itemToAdd = { ...newSavings, id: savings.length + 1 };

    const res = await fetch("/api/savings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemToAdd),
    });

    if (res.ok) {
      await fetch("/api/savings")
        .then((res) => res.json())
        .then((data) => setSavings(data));
      setNewSavings({ id: 0, title: "", amount: 0, category: "", date: "" });
    }
  };

  const handleRemoveItem = async (id: number) => {
    const res = await fetch(`/api/savings`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      await fetch("/api/savings")
        .then((res) => res.json())
        .then((data) => setSavings(data));
    }
  };

  return (
    <main className="min-h-screen bg-pink-50 p-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Savings</h1>

      {/* Add Savings Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Savings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={newSavings.title}
            onChange={(e) =>
              setNewSavings({ ...newSavings, title: e.target.value })
            }
            className="border rounded p-2"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newSavings.amount}
            onChange={(e) =>
              setNewSavings({ ...newSavings, amount: Number(e.target.value) })
            }
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Category"
            value={newSavings.category}
            onChange={(e) =>
              setNewSavings({ ...newSavings, category: e.target.value })
            }
            className="border rounded p-2"
          />
          <input
            type="date"
            value={newSavings.date}
            onChange={(e) =>
              setNewSavings({ ...newSavings, date: e.target.value })
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
        <h2 className="text-xl font-semibold mb-4">Savings List</h2>
        {savings.length === 0 ? (
          <p className="text-gray-500">No savings added yet.</p>
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
              {savings.map((savingsItem) => (
                <tr key={savingsItem.id} className="text-center">
                  <td className="border p-2">{savingsItem.title}</td>
                  <td className="border p-2">₹{savingsItem.amount}</td>
                  <td className="border p-2">{savingsItem.category}</td>
                  <td className="border p-2">{savingsItem.date}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleRemoveItem(savingsItem.id)}
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

export default SavingsPage;
