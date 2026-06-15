"use client";
import { useState } from "react";

function getDayCount(startDate, endDate) {
  if (!startDate) return 1;
  if (!endDate) return 1;
  const diff = Math.ceil(
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
  ) + 1;
  return diff > 0 ? diff : 1;
}

function formatDate(startDate, dayIndex) {
  if (!startDate) return `Day ${dayIndex + 1}`;
  const date = new Date(startDate);
  date.setDate(date.getDate() + dayIndex);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// Sort activities by start time
function sortByTime(items) {
  return [...items].sort((a, b) => {
    if (!a.startTime) return 1;
    if (!b.startTime) return -1;
    return a.startTime.localeCompare(b.startTime);
  });
}

export default function ItineraryView({ itinerary, setItinerary, activeTrip }) {
  const dayCount = getDayCount(activeTrip?.startDate, activeTrip?.endDate);
  const [activeDay, setActiveDay] = useState(0);
  const [form, setForm] = useState({ title: "", startTime: "", endTime: "" });
  const [editId, setEditId] = useState(null); // id of item being edited

  const dayItems = sortByTime(itinerary[String(activeDay)] || []);

  const resetForm = () => setForm({ title: "", startTime: "", endTime: "" });

  const addItem = () => {
    if (!form.title.trim()) return;
    const item = {
      id: Date.now(),
      title: form.title.trim(),
      startTime: form.startTime,
      endTime: form.endTime,
    };
    setItinerary({
      ...itinerary,
      [String(activeDay)]: [...(itinerary[String(activeDay)] || []), item],
    });
    resetForm();
  };

  const removeItem = (id) => {
    setItinerary({
      ...itinerary,
      [String(activeDay)]: (itinerary[String(activeDay)] || []).filter(
        (i) => i.id !== id
      ),
    });
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setForm({ title: item.title, startTime: item.startTime || "", endTime: item.endTime || "" });
  };

  const saveEdit = () => {
    setItinerary({
      ...itinerary,
      [String(activeDay)]: (itinerary[String(activeDay)] || []).map((i) =>
        i.id === editId
          ? { ...i, title: form.title.trim(), startTime: form.startTime, endTime: form.endTime }
          : i
      ),
    });
    setEditId(null);
    resetForm();
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
            onClick={() => { setActiveDay(i); setEditId(null); resetForm(); }}
          >
            <span className="day-tab-label">Day {i + 1}</span>
            <span className="day-tab-date">{formatDate(activeTrip.startDate, i)}</span>
          </button>
        ))}
      </div>

      {/* Day content */}
      <div className="day-content">
        <h3 className="day-heading">
          Day {activeDay + 1} · {formatDate(activeTrip.startDate, activeDay)}
          <span className="day-count-badge">
            {dayItems.length} item{dayItems.length !== 1 ? "s" : ""}
          </span>
        </h3>

        {dayItems.length === 0 && (
          <p className="empty-state">No activities planned for this day yet.</p>
        )}

        {/* Activity timeline */}
        <ul className="itinerary-timeline">
          {dayItems.map((item, idx) => (
            <li key={item.id} className="timeline-item">
              {/* Time column */}
              <div className="timeline-time">
                {item.startTime ? (
                  <>
                    <span className="time-start">{item.startTime}</span>
                    {item.endTime && (
                      <>
                        <span className="time-divider">–</span>
                        <span className="time-end">{item.endTime}</span>
                      </>
                    )}
                  </>
                ) : (
                  <span className="time-none">—</span>
                )}
              </div>

              {/* Arrow */}
              <div className="timeline-arrow">→</div>

              {/* Activity */}
              {editId === item.id ? (
                /* Inline edit row */
                <div className="timeline-edit">
                  <input
                    type="time"
                    className="form-input time-input"
                    value={form.startTime}
                    onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                  />
                  <input
                    type="time"
                    className="form-input time-input"
                    value={form.endTime}
                    onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                  />
                  <input
                    type="text"
                    className="form-input"
                    style={{ flex: 1 }}
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                    autoFocus
                  />
                  <button className="btn btn-primary" style={{ flexShrink: 0 }} onClick={saveEdit}>
                    Save
                  </button>
                  <button className="btn btn-secondary" style={{ flexShrink: 0 }} onClick={() => { setEditId(null); resetForm(); }}>
                    ✕
                  </button>
                </div>
              ) : (
                <div className="timeline-body">
                  <span className="timeline-index">{idx + 1}</span>
                  <span className="timeline-title">{item.title}</span>
                  <div className="timeline-actions">
                    <button className="icon-btn" onClick={() => startEdit(item)} aria-label="Edit">✏️</button>
                    <button className="icon-btn danger" onClick={() => removeItem(item.id)} aria-label="Remove">✕</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Add new activity */}
        {editId === null && (
          <div className="add-activity-row">
            <div className="add-activity-times">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Start</label>
                <input
                  type="time"
                  className="form-input time-input"
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                />
              </div>
              <div className="add-activity-dash">–</div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">End</label>
                <input
                  type="time"
                  className="form-input time-input"
                  value={form.endTime}
                  onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                />
              </div>
            </div>

            <div className="add-activity-title">
              <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
                <label className="form-label">Activity</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Visit Eiffel Tower, Lunch at..."
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && addItem()}
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={addItem}
                style={{ alignSelf: "flex-end", flexShrink: 0 }}
                disabled={!form.title.trim()}
              >
                + Add
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
