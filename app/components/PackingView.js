import React, { useState } from 'react';

export default function PackingView({ packing, setPacking }) {
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (newItem.trim() === '') return;
    setPacking([...packing, { id: Date.now(), name: newItem.trim() }]);
    setNewItem('');
  };

  const handleRemove = (id) => {
    setPacking(packing.filter((item) => item.id !== id));
  };

  return (
    <section className="packing-view">
      <h2>Packing List</h2>
      <ul>
        {packing.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleRemove(item.id)} className="remove-btn">
              ✕
            </button>
          </li>
        ))}
      </ul>
      <div className="add-packing">
        <input
          type="text"
          placeholder="Add item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </section>
  );
}
