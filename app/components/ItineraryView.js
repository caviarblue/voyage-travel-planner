"use client";
import { useState } from "react";

function getDayCount(startDate, endDate) {
  if (!startDate) return 1;
  if (!endDate) return 1;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  return diff > 0 ? diff : 1;
}

function formatDate(startDate, dayIndex) {
  if (!startDate) return `Day ${dayIndex + 1}`;
  const date = new Date(startDate);
  date.setDate(date.getDate() + dayIndex);
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function ItineraryView({ itinerary, setItinerary, activeTrip }) {
  const dayCount = getDayCount(activeTrip?.startDate, activeTrip?.endDate);
  const [activeDay, setActiveDay] = useState(0);
  const [newItem, setNewItem] = useState("");

  const dayItems = itinerary[String(activeDay)] || [];

  const addItem = () => {
    if (!newItem.trim()) return;
    const item = { id: Date.now(), title: newItem.trim() };
    setItinerary({
      ...itinerary,
      [String(activeDay)]: [...dayItems, item],
    });
    setNewItem("");
  };

  const removeItem = (id) => {
    setItinerary({
      ...itinerary,
      [String(activeDay)]: dayItems.filter((i) => i.id !== id),
    });
  };

  if (!activeTrip) {
    return (
      <section className="itinerary-view">
        <h2 className="section-title">🗓️ Itinerary</h2>
        <p className="empty-state">Select or create a trip first to build your itinerary.</p>
      </section>
    );
  }

  return (
    <section className="itinerary-view">
      <h2 className="section-title">🗓️ Itinerary — {activeTrip.destination}</h2>
      <p className="section-sub">{dayCount} day{dayCount !== 1 ? "s" : ""} planned</p>

      {/* Day tabs */}
      <div className="day-tabs">
        {Array.from({ length: dayCount }, (_, i) => (
          <button
            key={i}
            className={`day-tab ${activeDay === i ? "active" : ""}`}
            onClick={() => setActiveDay(i)}
          >
            <span className="day-tab-label">Day {i + 1}</span>
            <span className="day-tab-date">{formatDate(activeTrip.startDate, i)}</span>
          </button>
        ))}
      </div>

      {/* Items for the active day */}
      <div className="day-content">
        <h3 className="day-heading">
          Day {activeDay + 1} · {formatDate(activeTrip.startDate, activeDay)}
          <span className="day-count-badge">{dayItems.length} item{dayItems.length !== 1 ? "s" : ""}</span>
        </h3>

        {dayItems.length === 0 && (
          <p className="empty-state">No activities planned for this day yet.</p>
        )}

        <ul className="itinerary-items">
          {dayItems.map((item, idx) => (
            <li key={item.id} className="itinerary-item">
              <span className="item-number">{idx + 1}</span>
              <span className="item-title">{item.title}</span>
              <button className="remove-btn" onClick={() => removeItem(item.id)} aria-label="Remove">✕</button>
            </li>
          ))}
        </ul>

        <div className="add-item">
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Visit Eiffel Tower, Lunch at..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
            style={{ flex: 1 }}
          />
          <button className="btn btn-primary" onClick={addItem}>+ Add</button>
        </div>
      </div>
    </section>
  );
}
