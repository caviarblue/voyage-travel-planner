export default function Sidebar({
  currentView,
  setCurrentView,
  trips,
  activeTripId,
  setActiveTripId,
  theme,
  setTheme,
  currency,
  onAddTripClick,
  onDeleteTrip,
  hasTrips,
}) {
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const allNavLinks = [
    { id: "dashboard",  label: "Dashboard",        icon: "📊", alwaysShow: true  },
    { id: "itinerary",  label: "Itinerary",         icon: "🗓️", alwaysShow: false },
    { id: "budget",     label: "Budget Tracker",    icon: "💰", alwaysShow: false },
    { id: "packing",    label: "Packing Checklist", icon: "🎒", alwaysShow: false },
  ];

  const visibleLinks = allNavLinks.filter((l) => l.alwaysShow || hasTrips);
  const activeTrip   = trips.find((t) => t.id === activeTripId);

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="logo-container">
        <div className="logo-icon">V</div>
        <h1 className="logo-text">Voy<span>age</span></h1>
      </div>

      {/* Nav */}
      <nav>
        <ul className="nav-links">
          {visibleLinks.map((link) => (
            <li key={link.id} className="nav-item">
              <a
                className={`nav-link ${currentView === link.id ? "active" : ""}`}
                onClick={() => setCurrentView(link.id)}
                href="#"
              >
                <span className="icon">{link.icon}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Trip selector */}
      {hasTrips && (
        <div className="sidebar-trip-select">
          <label htmlFor="tripSelector">Active Trip</label>
          <select
            id="tripSelector"
            className="trip-selector-dropdown"
            value={activeTripId}
            onChange={(e) => setActiveTripId(e.target.value)}
          >
            {trips.map((trip) => (
              <option key={trip.id} value={trip.id}>
                {trip.destination}
              </option>
            ))}
          </select>

          {activeTrip && (
            <div className="trip-meta">
              {activeTrip.startDate && (
                <span>
                  📅 {activeTrip.startDate}
                  {activeTrip.endDate ? ` → ${activeTrip.endDate}` : ""}
                </span>
              )}
              {activeTrip.baseBudget > 0 && (
                <span>💵 {activeTrip.baseBudget.toLocaleString()} {currency}</span>
              )}
              {/* Show the locked currency for this trip */}
              <span className="trip-meta-currency">🔒 {currency}</span>
            </div>
          )}

          <button
            className="btn-delete-trip"
            onClick={() => {
              if (window.confirm(`Delete trip to "${activeTrip?.destination}"? This cannot be undone.`)) {
                onDeleteTrip(activeTripId);
              }
            }}
          >
            🗑️ Delete This Trip
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="sidebar-footer">
        <button
          className="btn btn-secondary"
          onClick={onAddTripClick}
          style={{ width: "100%" }}
        >
          ➕ Plan New Trip
        </button>
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          style={{ width: "100%" }}
        >
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </aside>
  );
}
