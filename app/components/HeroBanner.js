"use client";

export default function HeroBanner({ activeTrip }) {
  return (
    <section className="hero-banner" style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">
        {activeTrip ? `✈️ Planning ${activeTrip.destination}` : "Select or create a trip to get started"}
      </h2>
      {activeTrip && (
        <div className="hero-meta">
          {activeTrip.startDate && (
            <span className="hero-meta-item">
              📅 {activeTrip.startDate}
              {activeTrip.endDate && ` → ${activeTrip.endDate}`}
            </span>
          )}
          {activeTrip.startDate && activeTrip.endDate && (
            <span className="hero-meta-item">
              🕒 {Math.ceil(
                (new Date(activeTrip.endDate) - new Date(activeTrip.startDate)) / (1000 * 60 * 60 * 24)
              )} days
            </span>
          )}
        </div>
      )}
      {!activeTrip && (
        <p style={{ color: "rgba(255,255,255,0.75)", marginTop: "0.4rem", fontSize: "0.95rem" }}>
          Click "Plan New Trip" in the sidebar to begin your adventure 🌍
        </p>
      )}
    </section>
  );
}
