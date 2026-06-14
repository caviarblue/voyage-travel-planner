export default function Sidebar({
  currentView,
  setCurrentView,
  trips,
  activeTripId,
  setActiveTripId,
  theme,
  setTheme,
  onAddTripClick
}) {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navLinks = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (
        <svg viewBox="0 0 24 24" strokeWidth="2">
          <rect x="3" y="3" width="7" height="9" rx="1"></rect>
          <rect x="14" y="3" width="7" height="5" rx="1"></rect>
          <rect x="14" y="12" width="7" height="9" rx="1"></rect>
          <rect x="3" y="16" width="7" height="5" rx="1"></rect>
        </svg>
      )
    },
    {
      id: "itinerary",
      label: "Itinerary",
      icon: (
        <svg viewBox="0 0 24 24" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      )
    },
    {
      id: "budget",
      label: "Budget Tracker",
      icon: (
        <svg viewBox="0 0 24 24" strokeWidth="2">
          <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9"></path>
          <path d="M16 14h.01"></path>
        </svg>
      )
    },
    {
      id: "packing",
      label: "Packing Checklist",
      icon: (
        <svg viewBox="0 0 24 24" strokeWidth="2">
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
        </svg>
      )
    },
    {
      id: "journal",
      label: "Travel Journal",
      icon: (
        <svg viewBox="0 0 24 24" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      )
    }
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="logo-container">
          <div className="logo-icon">V</div>
          <h1 className="logo-text">Voy<span>age</span></h1>
        </div>

        <nav>
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.id} className="nav-item">
                <a
                  className={`nav-link ${currentView === link.id ? "active" : ""}`}
                  onClick={() => setCurrentView(link.id)}
                  data-testid={`nav-${link.id}`}
                >
                  {link.icon}
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
            data-testid="trip-select"
          >
            {trips.map((trip) => (
              <option key={trip.id} value={trip.id}>
                {trip.destination}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="sidebar-footer">
        <button
          className="btn btn-secondary"
          onClick={onAddTripClick}
          style={{ width: "100%" }}
          data-testid="add-trip-btn"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Plan New Trip
        </button>

        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          style={{ width: "100%" }}
          data-testid="theme-toggle"
        >
          {theme === "dark" ? (
            <>
              {/* Sun SVG */}
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              <span>Light Mode</span>
            </>
          ) : (
            <>
              {/* Moon SVG */}
              <svg viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
