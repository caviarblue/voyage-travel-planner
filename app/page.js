"use client";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import HeroBanner from "./components/HeroBanner";
import DashboardView from "./components/DashboardView";
import ItineraryView from "./components/ItineraryView";
import BudgetView from "./components/BudgetView";
import PackingView from "./components/PackingView";
import { CURRENCIES } from "./utils/currency";

const DEFAULT_BUDGET = { baseline: 0, expenses: [] };

const DESTINATION_PLACEHOLDERS = {
  IDR: "e.g. Bali, Jakarta, or Yogyakarta",
  USD: "e.g. New York, Los Angeles, or Hawaii",
  EUR: "e.g. Paris, Rome, or Berlin",
  GBP: "e.g. London, Edinburgh, or Manchester",
  JPY: "e.g. Tokyo, Kyoto, or Osaka",
  AUD: "e.g. Sydney, Melbourne, or Cairns",
  SGD: "e.g. Marina Bay, Sentosa, or Singapore",
  MYR: "e.g. Kuala Lumpur, Penang, or Langkawi",
  THB: "e.g. Bangkok, Phuket, or Chiang Mai",
  CNY: "e.g. Beijing, Shanghai, or Chengdu",
  KRW: "e.g. Seoul, Busan, or Jeju Island",
  HKD: "e.g. Hong Kong, Kowloon, or Lantau Island",
  CAD: "e.g. Toronto, Vancouver, or Montreal",
  CHF: "e.g. Zurich, Geneva, or Zermatt",
};

export default function Home() {
  // Server-safe initial state (no localStorage reads)
  const [mounted, setMounted]           = useState(false);
  const [theme, setTheme]               = useState("light");
  const [currentView, setCurrentView]   = useState("dashboard");
  const [trips, setTrips]               = useState([]);
  const [activeTripId, setActiveTripId] = useState("");
  const [itinerary, setItinerary]       = useState({});
  const [budget, setBudget]             = useState(DEFAULT_BUDGET);
  const [packing, setPacking]           = useState([]);

  // New Trip Modal
  const [showNewTripModal, setShowNewTripModal] = useState(false);
  const [newTripForm, setNewTripForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    baseBudget: "",
    currency: "IDR", // default, always choosable per trip
  });
  const [duration, setDuration] = useState(1);

  // Helper: calculate end date based on start date and number of days
  const calculateEndDate = (startDateStr, days) => {
    if (!startDateStr || isNaN(days) || days < 1) return "";
    const [y, m, d] = startDateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + days - 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Helper: calculate number of days between two dates
  const calculateDays = (startDateStr, endDateStr) => {
    if (!startDateStr || !endDateStr) return 1;
    const [y1, m1, d1] = startDateStr.split("-").map(Number);
    const [y2, m2, d2] = endDateStr.split("-").map(Number);
    const date1 = new Date(y1, m1 - 1, d1);
    const date2 = new Date(y2, m2 - 1, d2);
    const diffTime = date2 - date1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 1;
  };

  const handleStartDateChange = (val) => {
    const newEnd = calculateEndDate(val, duration);
    setNewTripForm((prev) => ({
      ...prev,
      startDate: val,
      endDate: newEnd,
    }));
  };

  const handleEndDateChange = (val) => {
    setNewTripForm((prev) => ({
      ...prev,
      endDate: val,
    }));
    if (val && val >= newTripForm.startDate) {
      const days = calculateDays(newTripForm.startDate, val);
      setDuration(days);
    }
  };

  const handleDurationChange = (days) => {
    const cleanDays = Math.max(1, days);
    setDuration(cleanDays);
    const newEnd = calculateEndDate(newTripForm.startDate, cleanDays);
    setNewTripForm((prev) => ({
      ...prev,
      endDate: newEnd,
    }));
  };

  const handleDecrementDays = () => {
    if (duration > 1) {
      handleDurationChange(duration - 1);
    }
  };

  const handleIncrementDays = () => {
    handleDurationChange(duration + 1);
  };

  // ── Hydrate from localStorage on mount ────────────────────────────────
  useEffect(() => {
    try {
      const t = localStorage.getItem("theme");
      if (t) setTheme(t);

      const savedTrips = localStorage.getItem("trips");
      const parsedTrips = savedTrips ? JSON.parse(savedTrips) : [];
      setTrips(parsedTrips);

      const savedActiveId = localStorage.getItem("activeTripId");
      setActiveTripId(savedActiveId || parsedTrips[0]?.id || "");

      const savedItin = localStorage.getItem("itinerary");
      if (savedItin) {
        const p = JSON.parse(savedItin);
        setItinerary(Array.isArray(p) ? {} : p);
      }

      const savedBudget = localStorage.getItem("budget");
      if (savedBudget) {
        const p = JSON.parse(savedBudget);
        setBudget(!p.baseline && !p.expenses?.[0]?.category ? DEFAULT_BUDGET : p);
      }

      const savedPacking = localStorage.getItem("packing");
      if (savedPacking) setPacking(JSON.parse(savedPacking));
    } catch (e) {
      console.warn("Failed to load from localStorage:", e);
    }
    setMounted(true);
  }, []);

  // ── Persist ────────────────────────────────────────────────────────────
  useEffect(() => { if (mounted) localStorage.setItem("theme", theme); }, [theme, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("trips", JSON.stringify(trips)); }, [trips, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("activeTripId", activeTripId); }, [activeTripId, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("itinerary", JSON.stringify(itinerary)); }, [itinerary, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("budget", JSON.stringify(budget)); }, [budget, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem("packing", JSON.stringify(packing)); }, [packing, mounted]);

  // ── Derived ────────────────────────────────────────────────────────────
  const activeTrip = trips.find((t) => t.id === activeTripId) || null;
  const hasTrips   = trips.length > 0;

  // Currency comes from the active trip — locked at creation, changes when switching trips
  const currency = activeTrip?.currency || "IDR";

  // Snap back to dashboard when all trips are deleted
  useEffect(() => {
    if (!hasTrips && currentView !== "dashboard") setCurrentView("dashboard");
  }, [hasTrips, currentView]);

  // ── Trip actions ───────────────────────────────────────────────────────
  const handleAddTripClick = () => {
    const today = new Date().toISOString().split("T")[0];
    setNewTripForm({
      destination: "",
      startDate: today,
      endDate: today,
      baseBudget: "",
      currency: "IDR", // fresh default every time
    });
    setDuration(1);
    setShowNewTripModal(true);
  };

  const handleCreateTrip = () => {
    if (!newTripForm.destination.trim()) return;
    const newTrip = {
      id: Date.now().toString(),
      destination: newTripForm.destination.trim(),
      startDate: newTripForm.startDate,
      endDate: newTripForm.endDate,
      baseBudget: parseFloat(newTripForm.baseBudget) || 0,
      currency: newTripForm.currency || "IDR", // locked to this trip forever
    };
    setTrips((prev) => [...prev, newTrip]);
    setActiveTripId(newTrip.id);
    setBudget({ baseline: newTrip.baseBudget, expenses: [] });
    setItinerary({});
    setShowNewTripModal(false);
  };

  const handleDeleteTrip = (tripId) => {
    const remaining = trips.filter((t) => t.id !== tripId);
    setTrips(remaining);
    if (activeTripId === tripId) {
      setActiveTripId(remaining[0]?.id ?? "");
      setBudget(DEFAULT_BUDGET);
      setItinerary({});
      setPacking([]);
    }
  };

  // ── Loading guard ──────────────────────────────────────────────────────
  if (!mounted) {
    return (
      <div className="app-container light" data-theme="light">
        <div className="app-loading">
          <div className="app-loading-spinner" />
        </div>
      </div>
    );
  }

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
              {/* Destination */}
              <div className="form-group">
                <label className="form-label" htmlFor="tripDestination">Destination</label>
                <input
                  id="tripDestination"
                  type="text"
                  className="form-input"
                  placeholder={DESTINATION_PLACEHOLDERS[newTripForm.currency] || "e.g. Bali, Indonesia"}
                  value={newTripForm.destination}
                  onChange={(e) => setNewTripForm({ ...newTripForm, destination: e.target.value })}
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleCreateTrip()}
                />
              </div>

              {/* Dates */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="tripStart">Start Date</label>
                  <input
                    id="tripStart"
                    type="date"
                    className="form-input"
                    value={newTripForm.startDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
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
                    onChange={(e) => handleEndDateChange(e.target.value)}
                  />
                </div>
              </div>

              {/* Day Counter */}
              <div className="form-group">
                <label className="form-label">Duration</label>
                <div className="day-counter-row">
                  <button
                    type="button"
                    className="day-counter-btn"
                    onClick={handleDecrementDays}
                    disabled={duration <= 1}
                  >
                    −
                  </button>
                  <div className="day-counter-display">
                    <input
                      type="number"
                      className="day-counter-input"
                      value={duration}
                      onChange={(e) => handleDurationChange(parseInt(e.target.value) || 1)}
                      min="1"
                    />
                    <span className="day-counter-label">days</span>
                  </div>
                  <button
                    type="button"
                    className="day-counter-btn"
                    onClick={handleIncrementDays}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Currency — always choosable, locked to THIS trip once created */}
              <div className="form-group">
                <label className="form-label" htmlFor="tripCurrency">
                  Currency
                  <span className="form-label-note">— locked to this trip after creation</span>
                </label>
                <select
                  id="tripCurrency"
                  className="form-input"
                  value={newTripForm.currency}
                  onChange={(e) => setNewTripForm({ ...newTripForm, currency: e.target.value })}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Baseline budget */}
              <div className="form-group">
                <label className="form-label" htmlFor="tripBudget">
                  Baseline Budget ({newTripForm.currency})
                </label>
                <input
                  id="tripBudget"
                  type="number"
                  className="form-input"
                  placeholder={newTripForm.currency === "IDR" ? "e.g. 5000000" : "e.g. 3000"}
                  min="0"
                  value={newTripForm.baseBudget}
                  onChange={(e) => setNewTripForm({ ...newTripForm, baseBudget: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowNewTripModal(false)}>
                Cancel
              </button>
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
