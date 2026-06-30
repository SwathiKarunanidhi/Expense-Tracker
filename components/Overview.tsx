"use client";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import { BudgetItem, ExpenseItem, Savings } from "../lib/types";
export default function Overview() {
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

  const expensePercent = totalBudget ? (totalExpenses / totalBudget) * 100 : 0;
  const savingsPercent = totalBudget ? (totalSavings / totalBudget) * 100 : 0;

  return (
    <section className="bg-white shadow rounded-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">
        Overview
      </h2>

      {/* Expenses Progress */}
      <div className="mb-6">
        <p className="text-gray-700 font-medium mb-2">
          Expenses ({expensePercent.toFixed(1)}%)
        </p>
        <div className="w-full bg-pink-100 rounded-full h-6">
          <div
            className="bg-pink-500 h-6 rounded-full transition-all duration-500"
            style={{ width: `${expensePercent}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          ₹{totalExpenses} spent of ₹{totalBudget}
        </p>
      </div>

      {/* Savings Progress */}
      <div>
        <p className="text-gray-700 font-medium mb-2">
          Savings ({savingsPercent.toFixed(1)}%)
        </p>
        <div className="w-full bg-pink-100 rounded-full h-6">
          <div
            className="bg-pink-400 h-6 rounded-full transition-all duration-500"
            style={{ width: `${savingsPercent}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Saved ₹{totalSavings} out from ₹{totalBudget}
        </p>
      </div>
      <p>
        More details{" "}
        <Link href="/dashboard" className="text-pink-600 hover:underline">
          here
        </Link>
        .
      </p>
    </section>
  );
}
