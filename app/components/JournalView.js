// app/components/JournalView.js
"use client";
import React, { useState } from "react";

export default function JournalView({ journal, setJournal }) {
  const [entry, setEntry] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!entry.trim()) return;
    const newEntry = {
      id: Date.now().toString(),
      text: entry.trim(),
      date: new Date().toLocaleDateString(),
    };
    setJournal([...journal, newEntry]);
    setEntry("");
  };

  return (
    <section className="journal-view" data-testid="journal-view">
      <h2 className="section-title">Travel Journal</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: "1rem" }}>
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write your travel notes..."
          rows={3}
          style={{ width: "100%" }}
        />
        <button type="submit" className="btn btn-primary" style={{ marginTop: "0.5rem" }}>
          Add Entry
        </button>
      </form>
      <ul className="journal-entries">
        {journal.map((item) => (
          <li key={item.id} className="journal-entry">
            <div className="journal-date">{item.date}</div>
            <div className="journal-text">{item.text}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
