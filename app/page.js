"use client";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import HeroBanner from "./components/HeroBanner";
import DashboardView from "./components/DashboardView";
import ItineraryView from "./components/ItineraryView";
import BudgetView from "./components/BudgetView";
import PackingView from "./components/PackingView";
import JournalView from "./components/JournalView";

export default function Home() {
  // Theme handling
  const [theme, setTheme] = useState("light");

  // Navigation state
  const [currentView, setCurrentView] = useState("dashboard");

  // Trips data (persisted in localStorage)
  const [trips, setTrips] = useState(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("trips") : null;
    return stored ? JSON.parse(stored) : [];
  });
  const [activeTripId, setActiveTripId] = useState(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("activeTripId") : null;
    return stored || (trips[0]?.id ?? "");
  });
  const activeTrip = trips.find((t) => t.id === activeTripId) || null;

  // Section states
  const [itinerary, setItinerary] = useState(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("itinerary") : null;
    return stored ? JSON.parse(stored) : [];
  });
  const [budget, setBudget] = useState(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("budget") : null;
    return stored ? JSON.parse(stored) : { total: 0, expenses: [] };
  });
  const [packing, setPacking] = useState(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("packing") : null;
    return stored ? JSON.parse(stored) : [];
  });
  const [journal, setJournal] = useState(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("journal") : null;
    return stored ? JSON.parse(stored) : [];
  });

  // Persist data changes
  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);
  useEffect(() => {
    localStorage.setItem("activeTripId", activeTripId);
  }, [activeTripId]);
  useEffect(() => {
    localStorage.setItem("itinerary", JSON.stringify(itinerary));
  }, [itinerary]);
  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget]);
  useEffect(() => {
    localStorage.setItem("packing", JSON.stringify(packing));
  }, [packing]);
  useEffect(() => {
    localStorage.setItem("journal", JSON.stringify(journal));
  }, [journal]);
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleAddTrip = () => {
    const newTrip = {
      id: Date.now().toString(),
      destination: "New Destination",
      startDate: new Date().toISOString().split("T")[0],
    };
    setTrips([...trips, newTrip]);
    setActiveTripId(newTrip.id);
  };

  return (
    <div className={`app-container ${theme}`} data-theme={theme}>
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        trips={trips}
        activeTripId={activeTripId}
        setActiveTripId={setActiveTripId}
        theme={theme}
        setTheme={setTheme}
        onAddTripClick={handleAddTrip}
      />
      <main className="main-content">
        <HeroBanner activeTrip={activeTrip} />
        {currentView === "dashboard" && (
          <DashboardView itinerary={itinerary} budget={budget} packing={packing} />
        )}
        {currentView === "itinerary" && (
          <ItineraryView itinerary={itinerary} setItinerary={setItinerary} />
        )}
        {currentView === "budget" && (
          <BudgetView budget={budget} setBudget={setBudget} />
        )}
        {currentView === "packing" && (
          <PackingView packing={packing} setPacking={setPacking} />
        )}
        {currentView === "journal" && (
          <JournalView journal={journal} setJournal={setJournal} />
        )}
      </main>
    </div>
  );
}
