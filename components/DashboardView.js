// app/components/DashboardView.js
"use client";
import React from "react";

export default function DashboardView({ itinerary, budget, packing }) {
  // Simple placeholder calculations
  const totalDays = itinerary?.length || 0;
  const spent = budget?.expenses?.reduce((sum, e) => sum + (e.amount || 0), 0) || 0;
  const totalBudget = budget?.total || 0;
  const budgetPercent = totalBudget ? Math.round((spent / totalBudget) * 100) : 0;
  const packedItems = packing?.length || 0;
  const totalPacking = 10; // assumed total items needed
  const packingPercent = totalPacking ? Math.round((packedItems / totalPacking) * 100) : 0;

  return (
    <section className="dashboard-view" data-testid="dashboard-view">
      <h2 className="section-title">Dashboard</h2>
      <div className="metrics-grid">
        <div className="metric-card">
          <svg viewBox="0 0 36 36" className="circular-progress">
            <path
              className="bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="progress"
              strokeDasharray={`${budgetPercent}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="percentage" textAnchor="middle">
              {budgetPercent}%
            </text>
          </svg>
          <p className="metric-label">Budget Used</p>
        </div>
        <div className="metric-card">
          <div className="horizontal-bar">
            <div
              className="filled"
              style={{ width: `${packingPercent}%` }}
            ></div>
          </div>
          <p className="metric-label">Packing {packedItems}/{totalPacking}</p>
        </div>
        <div className="metric-card">
          <p className="big-number">{totalDays}</p>
          <p className="metric-label">Trip Days</p>
        </div>
      </div>
    </section>
  );
}
