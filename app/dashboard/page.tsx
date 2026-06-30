"use client";
import { useEffect, useState } from "react";
import { BudgetItem, ExpenseItem, Savings } from "../../lib/types";
export default function DashboardPage() {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [savings, setSavings] = useState<Savings[]>([]);

  useEffect(() => {
    fetch("/api/budget")
      .then((res) => res.json())
      .then((data) => setBudgetItems(data));

    fetch("/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data));

    fetch("/api/savings")
      .then((res) => res.json())
      .then((data) => setSavings(data));
  }, []);

  const totalBudget = budgetItems.reduce((sum, b) => sum + b.allocated, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalSavings = savings.reduce((sum, e) => sum + e.amount, 0);

  const categories = Array.from(
    new Set([
      ...budgetItems.map((b) => b.category),
      ...expenses.map((e) => e.category),
      ...savings.map((s) => s.category),
    ]),
  );

  return (
    <main className="min-h-screen bg-pink-50 p-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">📊 Dashboard</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
        <table className="w-full border-collapse mb-8">
          <thead>
            <tr className="bg-pink-100">
              <th className="border p-2">Category</th>
              <th className="border p-2">Budget</th>
              <th className="border p-2">Spent</th>
              <th className="border p-2">Saved</th>
              <th className="border p-2">Remaining</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => {
              const budget = budgetItems
                .filter((b) => b.category === cat)
                .reduce((sum, b) => sum + b.allocated, 0);

              const spent = expenses
                .filter((e) => e.category === cat)
                .reduce((sum, e) => sum + e.amount, 0);

              const saved = savings
                .filter((s) => s.category === cat)
                .reduce((sum, s) => sum + s.amount, 0);

              const remaining = budget - spent - saved;

              return (
                <tr key={cat} className="text-center">
                  <td className="border p-2">{cat}</td>
                  <td className="border p-2">₹{budget}</td>
                  <td className="border p-2">₹{spent}</td>
                  <td className="border p-2">₹{saved}</td>
                  <td className="border p-2">₹{remaining}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Progress bars per category */}
        <div className="space-y-6">
          {categories.map((cat) => {
            const budget = budgetItems
              .filter((b) => b.category === cat)
              .reduce((sum, b) => sum + b.allocated, 0);

            const spent = expenses
              .filter((e) => e.category === cat)
              .reduce((sum, e) => sum + e.amount, 0);

            const saved = savings
              .filter((s) => s.category === cat)
              .reduce((sum, s) => sum + s.amount, 0);

            const remaining = budget - spent - saved;

            const spentPercent = budget ? (spent / budget) * 100 : 0;
            const savedPercent = budget ? (saved / budget) * 100 : 0;
            const remainingPercent = budget ? (remaining / budget) * 100 : 0;

            return (
              <div key={cat}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{cat}</span>
                  <span className="text-sm text-gray-600">
                    {spentPercent.toFixed(1)}% Spent | {savedPercent.toFixed(1)}
                    % Saved | {remainingPercent.toFixed(1)}% Remaining
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded h-4 flex overflow-hidden">
                  <div
                    className="bg-red-400 h-4"
                    style={{ width: `${spentPercent}%` }}
                  ></div>
                  <div
                    className="bg-green-400 h-4"
                    style={{ width: `${savedPercent}%` }}
                  ></div>
                  <div
                    className="bg-white-400 h-4"
                    style={{ width: `${remainingPercent}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
