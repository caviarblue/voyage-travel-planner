import React, { useState } from "react";

export default function JournalView({ journal, setJournal }) {
  const [newEntry, setNewEntry] = useState({ title: "", content: "" });

  const addEntry = () => {
    if (!newEntry.title.trim() && !newEntry.content.trim()) return;
    const entry = {
      id: Date.now(),
      title: newEntry.title.trim(),
      content: newEntry.content.trim(),
      date: new Date().toLocaleDateString(),
    };
    setJournal([...journal, entry]);
    setNewEntry({ title: "", content: "" });
  };

  const removeEntry = (id) => {
    setJournal(journal.filter((e) => e.id !== id));
  };

  return (
    <section className="journal-view">
      <h2 className="section-title">Travel Journal</h2>
      <ul className="journal-entries">
        {journal.map((e) => (
          <li key={e.id} className="journal-entry">
            <div className="journal-date">{e.date}</div>
            <strong>{e.title}</strong>
            <p>{e.content}</p>
            <button className="btn btn-secondary" onClick={() => removeEntry(e.id)}>
              ✕ Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="add-journal" style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Entry title"
          value={newEntry.title}
          onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
          className="btn btn-secondary"
          style={{ width: "30%", marginRight: "0.5rem" }}
        />
        <textarea
          placeholder="Entry content"
          value={newEntry.content}
          onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
          className="btn btn-secondary"
          style={{ width: "50%", marginRight: "0.5rem", height: "80px" }}
        />
        <button className="btn btn-primary" onClick={addEntry}>
          Add Entry
        </button>
      </div>
    </section>
  );
}
