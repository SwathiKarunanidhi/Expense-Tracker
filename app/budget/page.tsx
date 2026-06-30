"use client";
import React, { useEffect, useState } from "react";
import { BudgetItem } from "../../lib/types";
const BudgetPage: React.FC = () => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [newItem, setNewItem] = useState<BudgetItem>({
    id: 0,
    title: "",
    allocated: 0,
    category: "",
  });

  // Load from API
  useEffect(() => {
    fetch("/api/budget")
      .then((res) => res.json())
      .then((data) => setBudgetItems(data));
  }, []);
  console.log({ budgetItems });
  const handleAddItem = async () => {
    if (!newItem.title || !newItem.allocated) return;
    const itemToAdd = { ...newItem, id: budgetItems.length + 1 };

    const res = await fetch("/api/budget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemToAdd),
    });

    if (res.ok) {
      await fetch("/api/budget")
        .then((res) => res.json())
        .then((data) => setBudgetItems(data));
      setNewItem({ id: 0, title: "", allocated: 0, category: "" });
    }
  };

  const handleRemoveItem = async (id: number) => {
    const res = await fetch(`/api/budget`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      await fetch("/api/budget")
        .then((res) => res.json())
        .then((data) => setBudgetItems(data));
    }
  };

  const handleEditItem = async (itemToEdit: BudgetItem) => {
    const res = await fetch(`/api/budget`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemToEdit),
    });

    if (res.ok) {
      await fetch("/api/budget")
        .then((res) => res.json())
        .then((data) => setBudgetItems(data));
    }
  };
  const totalBudget = budgetItems.reduce(
    (sum, item) => sum + item.allocated,
    0,
  );

  return (
    <main className="min-h-screen bg-pink-50 p-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">
        💰 Budget Allocation
      </h1>

      {/* Add Budget Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Budget Item</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="number"
            placeholder="Allocated Budget"
            value={newItem.allocated}
            onChange={(e) =>
              setNewItem({ ...newItem, allocated: Number(e.target.value) })
            }
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Category"
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
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

      {/* Budget List */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Budget List</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-pink-100">
              <th className="border p-2">Title</th>
              <th className="border p-2">Allocated Budget</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgetItems.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border p-2">{item.title}</td>
                <td className="border p-2">₹{item.allocated}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-700"
                  >
                    Edit{" "}
                  </button>{" "}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className=" px-4 py-1 bg-red-500 text-white rounded hover:bg-red-700 "
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
            <tr className="bg-pink-50 font-bold">
              <td className="border p-2">Total</td>
              <td className="border p-2">₹{totalBudget}</td>
              <td className="border p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default BudgetPage;
