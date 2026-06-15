"use client";
import { formatCurrency } from "../utils/currency";

const CATEGORIES = [
  { id: "transportation", label: "Transportation", icon: "🚌" },
  { id: "accommodation",  label: "Accommodation",  icon: "🏨" },
  { id: "attraction",     label: "Attraction",     icon: "🎡" },
  { id: "food",           label: "Food & Drinks",  icon: "🍜" },
  { id: "others",         label: "Others",         icon: "📦" },
];

export default function DashboardView({ itinerary, budget, packing, currency, hasTrips, onAddTripClick }) {
  // ── Empty / welcome state ─────────────────────────────────
  if (!hasTrips) {
    return (
      <div className="welcome-screen">
        <div className="welcome-content">
          <div className="welcome-globe">🌍</div>
          <h2 className="welcome-title">Welcome to Voyage</h2>
          <p className="welcome-desc">
            Your smart travel planner. Plan itineraries day-by-day, track your budget by category,
            and manage your packing list — all in one place.
          </p>
          <div className="welcome-features">
            <div className="welcome-feature">
              <span>🗓️</span>
              <span>Day-by-day itinerary planning</span>
            </div>
            <div className="welcome-feature">
              <span>💰</span>
              <span>Budget tracker with categories</span>
            </div>
            <div className="welcome-feature">
              <span>🎒</span>
              <span>Smart packing checklist</span>
            </div>
          </div>
          <button className="btn btn-primary btn-welcome" onClick={onAddTripClick}>
            ✈️ Plan Your First Trip
          </button>
        </div>
      </div>
    );
  }

  // ── Dashboard overview (has trips) ────────────────────────
  const totalItineraryItems = Object.values(itinerary).flat().length;
  const totalDays = Object.keys(itinerary).length;
  const baseline = budget.baseline || 0;
  const totalSpent = (budget.expenses || []).reduce((sum, e) => sum + e.amount, 0);
  const remaining = baseline - totalSpent;
  const usedPct = baseline > 0 ? Math.min((totalSpent / baseline) * 100, 100) : 0;
  const packedCount = packing.filter((i) => i.checked).length;

  return (
    <section className="dashboard-view">
      <h2 className="section-title">📊 Dashboard Overview</h2>

      <div className="summary-grid">
        <div className="summary-card">
          <h3>Trip Days Logged</h3>
          <p>{totalDays || "—"}</p>
        </div>
        <div className="summary-card">
          <h3>Activities</h3>
          <p>{totalItineraryItems}</p>
        </div>
        <div className="summary-card">
          <h3>Budget Used</h3>
          <p style={{ fontSize: "1.4rem" }}>{usedPct.toFixed(0)}%</p>
        </div>
        <div className="summary-card">
          <h3>Packed Items</h3>
          <p style={{ fontSize: "1.4rem" }}>{packedCount}/{packing.length}</p>
        </div>
      </div>

      {/* Budget quick view */}
      {baseline > 0 && (
        <div className="dashboard-budget-card">
          <div className="dashboard-budget-header">
            <span>💰 Budget Summary</span>
            <span className={remaining < 0 ? "over" : ""}>
              {remaining < 0
                ? `⚠️ Over by ${formatCurrency(Math.abs(remaining), currency)}`
                : `${formatCurrency(remaining, currency)} remaining`}
            </span>
          </div>
          <div className="budget-progress-track">
            <div
              className="budget-progress-fill"
              style={{
                width: `${usedPct}%`,
                background: usedPct >= 100
                  ? "hsl(0,70%,55%)"
                  : usedPct >= 80
                  ? "hsl(35,85%,52%)"
                  : "var(--accent)",
              }}
            />
          </div>
          <div className="budget-progress-labels">
            <span>{usedPct.toFixed(1)}% used</span>
            <span>{formatCurrency(totalSpent, currency)} / {formatCurrency(baseline, currency)}</span>
          </div>

          <div className="dashboard-budget-cats">
            {CATEGORIES.map((cat) => {
              const catTotal = (budget.expenses || [])
                .filter((e) => e.category === cat.id)
                .reduce((sum, e) => sum + e.amount, 0);
              if (catTotal === 0) return null;
              return (
                <span key={cat.id} className="dash-cat-chip">
                  {cat.icon} {formatCurrency(catTotal, currency)}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
