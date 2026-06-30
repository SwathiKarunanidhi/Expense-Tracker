// app/page.tsx (if using Next.js App Router)
// or pages/index.tsx (if using Pages Router)

import Link from "next/link";
import React from "react";
import Overview from "../components/Overview";

const LandingPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-pink-50 text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold text-pink-600 mb-4">
          Wedding Expense Tracker
        </h1>
        <p className="text-lg max-w-xl mx-auto mb-8">
          Keep your wedding budget organized, track expenses, and stay
          stress‑free on your big day.
        </p>
        {/* <Link
          href="/dashboard"
          className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition"
        >
          Get Started
        </Link> */}
      </section>
      <section>
        <Overview />
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 px-10 py-16 max-w-5xl">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">
            <Link href="/budget">💰 Budget Planner</Link>
          </h2>
          <p>Set your wedding budget and allocate funds to categories.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">
            <Link href="/expenses"> Expense Tracking</Link>
          </h2>
          <p>Log expenses and monitor spending in real time.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">
            <Link href="/savings">Savings</Link>
          </h2>
          <p>Log savings and monitor in real time.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">
            <Link href="/analytics">📈 Analytics</Link>
          </h2>
          <p>Visualize your spending trends with charts and insights.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Wedding Expense Tracker. All rights
        reserved.
      </footer>
    </main>
  );
};

export default LandingPage;
