// app/components/PackingView.js
"use client";
import React from "react";

export default function PackingView({ packing, setPacking }) {
  const handleAddItem = () => {
    const newItem = {
      id: Date.now().toString(),
      name: "New item",
      packed: false,
    };
    setPacking([...packing, newItem]);
  };

  const togglePacked = (id) => {
    setPacking(packing.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  };

  return (
    <section className="packing-view" data-testid="packing-view">
      <h2 className="section-title">Packing Checklist</h2>
      <button className="btn btn-primary" onClick={handleAddItem}>Add Item</button>
      <ul className="packing-list">
        {packing.map(item => (
          <li key={item.id}>
            <label>
              <input type="checkbox" checked={!!item.packed} onChange={() => togglePacked(item.id)} />
              {item.name}
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
