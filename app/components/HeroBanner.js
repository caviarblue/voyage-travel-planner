export default function HeroBanner({ trip, currencySymbol }) {
  const start = new Date(trip.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const end = new Date(trip.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const imgSrc = trip.bannerImage 
    ? `/${trip.bannerImage}` 
    : "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80";

  return (
    <header className="hero-banner">
      <img 
        id="heroImage" 
        className="hero-img" 
        src={imgSrc} 
        alt="Travel Banner"
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80";
        }}
      />
      <div className="hero-overlay">
        <span className="trip-badge">Current Trip</span>
        <h2 id="heroTitle" className="hero-title">{trip.destination}</h2>
        <div className="hero-meta">
          <span id="heroDates">
            <svg 
              viewBox="0 0 24 24" 
              strokeWidth="2" 
              fill="none" 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              style={{ width: "16px", height: "16px", marginRight: "4px" }}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {start} - {end}
          </span>
          <span>
            <svg 
              viewBox="0 0 24 24" 
              strokeWidth="2" 
              fill="none" 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ width: "16px", height: "16px", marginRight: "4px" }}
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            Budget: <strong id="heroBudgetVal">{currencySymbol}{trip.budget.toLocaleString()}</strong>
          </span>
        </div>
      </div>
    </header>
  );
}
