"use client";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import HeroBanner from "./components/HeroBanner";
import DashboardView from "./components/DashboardView";
import ItineraryView from "./components/ItineraryView";
import BudgetView from "./components/BudgetView";
import PackingView from "./components/PackingView";

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [currentView, setCurrentView] = useState("dashboard");

  // Currency — default IDR
  const [currency, setCurrency] = useState(() => {
    return typeof window !== "undefined"
      ? (localStorage.getItem("currency") || "IDR")
      : "IDR";
  });

  // New Trip Modal
  const [showNewTripModal, setShowNewTripModal] = useState(false);
  const [newTripForm, setNewTripForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    baseBudget: "",
  });

  // Trips
  const [trips, setTrips] = useState(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("trips") : null;
    return stored ? JSON.parse(stored) : [];
  });
  const [activeTripId, setActiveTripId] = useState(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("activeTripId") : null;
    return stored || (trips[0]?.id ?? "");
  });
  const activeTrip = trips.find((t) => t.id === activeTripId) || null;
  const hasTrips = trips.length > 0;

  // Itinerary: { "0": [{id,title}], "1": [...] }
  const [itinerary, setItinerary] = useState(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("itinerary") : null;
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return {};
      return parsed;
    }
    return {};
  });

  // Budget: { baseline, expenses: [{id, name, amount, category}] }
  const [budget, setBudget] = useState(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("budget") : null;
    if (stored) {
      const parsed = JSON.parse(stored);
      if (!parsed.baseline && !parsed.expenses?.[0]?.category) return { baseline: 0, expenses: [] };
      return parsed;
    }
    return { baseline: 0, expenses: [] };
  });

  // Packing
  const [packing, setPacking] = useState(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("packing") : null;
    return stored ? JSON.parse(stored) : [];
  });

  // Persist
  useEffect(() => { localStorage.setItem("trips", JSON.stringify(trips)); }, [trips]);
  useEffect(() => { localStorage.setItem("activeTripId", activeTripId); }, [activeTripId]);
  useEffect(() => { localStorage.setItem("itinerary", JSON.stringify(itinerary)); }, [itinerary]);
  useEffect(() => { localStorage.setItem("budget", JSON.stringify(budget)); }, [budget]);
  useEffect(() => { localStorage.setItem("packing", JSON.stringify(packing)); }, [packing]);
  useEffect(() => { localStorage.setItem("theme", theme); }, [theme]);
  useEffect(() => { localStorage.setItem("currency", currency); }, [currency]);

  // If trip is deleted and we're on a hidden view, go back to dashboard
  useEffect(() => {
    if (!hasTrips && currentView !== "dashboard") setCurrentView("dashboard");
  }, [hasTrips, currentView]);

  // Open create modal
  const handleAddTripClick = () => {
    setNewTripForm({
      destination: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      baseBudget: "",
    });
    setShowNewTripModal(true);
  };

  // Confirm create trip
  const handleCreateTrip = () => {
    if (!newTripForm.destination.trim()) return;
    const newTrip = {
      id: Date.now().toString(),
      destination: newTripForm.destination.trim(),
      startDate: newTripForm.startDate,
      endDate: newTripForm.endDate,
      baseBudget: parseFloat(newTripForm.baseBudget) || 0,
    };
    setTrips([...trips, newTrip]);
    setActiveTripId(newTrip.id);
    setBudget({ baseline: newTrip.baseBudget, expenses: [] });
    setItinerary({});
    setShowNewTripModal(false);
  };

  // Delete active trip
  const handleDeleteTrip = (tripId) => {
    const remaining = trips.filter((t) => t.id !== tripId);
    setTrips(remaining);
    if (activeTripId === tripId) {
      setActiveTripId(remaining[0]?.id ?? "");
      setBudget({ baseline: 0, expenses: [] });
      setItinerary({});
      setPacking([]);
    }
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
        currency={currency}
        setCurrency={setCurrency}
        onAddTripClick={handleAddTripClick}
        onDeleteTrip={handleDeleteTrip}
        hasTrips={hasTrips}
      />

      <main className="main-content">
        {hasTrips && <HeroBanner activeTrip={activeTrip} currency={currency} />}

        {currentView === "dashboard" && (
          <DashboardView
            itinerary={itinerary}
            budget={budget}
            packing={packing}
            currency={currency}
            hasTrips={hasTrips}
            onAddTripClick={handleAddTripClick}
          />
        )}
        {currentView === "itinerary" && hasTrips && (
          <ItineraryView
            itinerary={itinerary}
            setItinerary={setItinerary}
            activeTrip={activeTrip}
          />
        )}
        {currentView === "budget" && hasTrips && (
          <BudgetView
            budget={budget}
            setBudget={setBudget}
            activeTrip={activeTrip}
            currency={currency}
          />
        )}
        {currentView === "packing" && hasTrips && (
          <PackingView packing={packing} setPacking={setPacking} />
        )}
      </main>

      {/* ── New Trip Modal ──────────────────────────────────── */}
      {showNewTripModal && (
        <div className="modal-overlay" onClick={() => setShowNewTripModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowNewTripModal(false)}>×</button>

            <div className="modal-header">
              <h2 className="modal-title">✈️ Plan a New Trip</h2>
              <p className="modal-subtitle">Fill in the details to start planning</p>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label className="form-label" htmlFor="tripDestination">Destination</label>
                <input
                  id="tripDestination"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Bali, Indonesia"
                  value={newTripForm.destination}
                  onChange={(e) => setNewTripForm({ ...newTripForm, destination: e.target.value })}
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleCreateTrip()}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="tripStart">Start Date</label>
                  <input
                    id="tripStart"
                    type="date"
                    className="form-input"
                    value={newTripForm.startDate}
                    onChange={(e) => setNewTripForm({ ...newTripForm, startDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="tripEnd">End Date</label>
                  <input
                    id="tripEnd"
                    type="date"
                    className="form-input"
                    value={newTripForm.endDate}
                    min={newTripForm.startDate}
                    onChange={(e) => setNewTripForm({ ...newTripForm, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="tripBudget">
                  Baseline Budget ({currency})
                </label>
                <input
                  id="tripBudget"
                  type="number"
                  className="form-input"
                  placeholder={currency === "IDR" ? "e.g. 5000000" : "e.g. 3000"}
                  min="0"
                  value={newTripForm.baseBudget}
                  onChange={(e) => setNewTripForm({ ...newTripForm, baseBudget: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowNewTripModal(false)}>Cancel</button>
              <button
                className="btn btn-primary"
                onClick={handleCreateTrip}
                disabled={!newTripForm.destination.trim()}
              >
                🚀 Create Trip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
