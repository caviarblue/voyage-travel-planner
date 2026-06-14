"use client";
import { useState } from "react";

export default function HeroBanner({ activeTrip }) {
  return (
    <section className="hero-banner" style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">
        {activeTrip
          ? `Planning ${activeTrip.destination}`
          : "Select or create a trip"}
      </h2>
      {activeTrip && (
        <p>
          From {activeTrip.startDate}
        </p>
      )}
    </section>
  );
}
