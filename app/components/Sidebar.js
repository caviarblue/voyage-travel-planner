export default function Sidebar({
  currentView,
  setCurrentView,
  trips,
  activeTripId,
  setActiveTripId,
  theme,
  setTheme,
  onAddTripClick,
}) {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navLinks = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "itinerary", label: "Itinerary", icon: "🗓️" },
    { id: "budget", label: "Budget Tracker", icon: "💰" },
    { id: "packing", label: "Packing Checklist", icon: "🎒" },
    { id: "journal", label: "Travel Journal", icon: "📓" },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <div className="logo-icon">V</div>
        <h1 className="logo-text">
          Voy<span>age</span>
        </h1>
      </div>

      <nav>
        <ul className="nav-links">
          {navLinks.map((link) => (
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
      </div>

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
