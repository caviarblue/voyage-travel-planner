import React from "react";

export default function DashboardView({ itinerary, budget, packing }) {
  return (
    <section className="dashboard-view">
      <h2 className="section-title">Dashboard Overview</h2>
      <div className="summary-grid">
        <div className="summary-card">
          <h3>Itinerary Items</h3>
          <p>{itinerary.length}</p>
        </div>
        <div className="summary-card">
          <h3>Total Budget</h3>
          <p>${budget.total?.toLocaleString() ?? 0}</p>
        </div>
        <div className="summary-card">
          <h3>Packing Items</h3>
          <p>{packing.length}</p>
        </div>
      </div>
    </section>
  );
}
