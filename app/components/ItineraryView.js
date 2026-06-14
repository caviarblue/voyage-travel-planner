import React, { useState } from "react";

export default function ItineraryView({ itinerary, setItinerary }) {
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (!newItem.trim()) return;
    const item = { id: Date.now(), title: newItem.trim() };
    setItinerary([...itinerary, item]);
    setNewItem("");
  };

  const removeItem = (id) => {
    setItinerary(itinerary.filter((i) => i.id !== id));
  };

  return (
    <section className="itinerary-view">
      <h2 className="section-title">Itinerary</h2>
      <ul>
        {itinerary.map((item) => (
          <li key={item.id}>
            {item.title}
            <button className="btn btn-secondary" onClick={() => removeItem(item.id)} style={{ marginLeft: "0.5rem" }}>
              ✕
            </button>
          </li>
        ))}
      </ul>
      <div className="add-item" style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Add itinerary item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="btn btn-secondary"
          style={{ width: "70%", marginRight: "0.5rem" }}
        />
        <button className="btn btn-primary" onClick={addItem}>
          Add
        </button>
      </div>
    </section>
  );
}
