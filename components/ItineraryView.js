// app/components/ItineraryView.js
"use client";
import React from "react";

export default function ItineraryView({ itinerary, setItinerary }) {
  // Placeholder rendering of itinerary items
  return (
    <section className="itinerary-view" data-testid="itinerary-view">
      <h2 className="section-title">Itinerary</h2>
      {itinerary.length === 0 ? (
        <p>No itinerary items. Add one using the button.</p>
      ) : (
        <ul className="itinerary-list">
          {itinerary.map((item, idx) => (
            <li key={idx} className="itinerary-item">
              <strong>{item.day || "Day " + (idx + 1)}:</strong> {item.title || "Untitled"}
            </li>
          ))}
        </ul>
      )}
      {/* Future: add buttons for editing/adding items with Modal */}
    </section>
  );
}
