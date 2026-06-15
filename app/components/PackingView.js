"use client";
import { useState } from 'react';

export default function PackingView({ packing, setPacking }) {
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (newItem.trim() === '') return;
    setPacking([...packing, { id: Date.now(), name: newItem.trim(), checked: false }]);
    setNewItem('');
  };

  const handleToggle = (id) => {
    setPacking(packing.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleRemove = (id) => {
    setPacking(packing.filter((item) => item.id !== id));
  };

  return (
    <section className="packing-view">
      <h2 className="section-title">🎒 Packing List</h2>

      {packing.length === 0 && (
        <p className="empty-state">No items yet — add something below!</p>
      )}

      <ul className="packing-list-items">
        {packing.map((item) => (
          <li key={item.id} className={`packing-item ${item.checked ? 'checked' : ''}`}>
            <label className="packing-check-label">
              <input
                type="checkbox"
                checked={item.checked || false}
                onChange={() => handleToggle(item.id)}
                className="packing-checkbox"
              />
              <span className="packing-item-name">{item.name}</span>
            </label>
            <button onClick={() => handleRemove(item.id)} className="remove-btn" aria-label="Remove item">
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="add-packing">
        <input
          type="text"
          placeholder="e.g. Sunscreen, Passport, Camera..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          className="form-input"
          style={{ flex: 1 }}
        />
        <button onClick={handleAdd} className="btn btn-primary">
          + Add Item
        </button>
      </div>
    </section>
  );
}
