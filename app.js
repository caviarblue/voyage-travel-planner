// Voyage Travel Planner Application Logic

const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  JPY: "¥",
  GBP: "£",
  AUD: "A$",
  CAD: "C$",
  CHF: "CHF",
  INR: "₹"
};

// Initial State (Default template)
const DEFAULT_STATE = {
  activeTripId: "trip-1",
  trips: [
    {
      id: "trip-1",
      destination: "Amalfi Coast, Italy",
      startDate: "2026-07-01",
      endDate: "2026-07-07",
      budget: 2500,
      currency: "USD",
      bannerImage: "voyage_banner_1781414805810.png", // Copied later or fallback
      itinerary: {
        "Day 1": [
          { id: "act-1", time: "14:00", title: "Hotel Check-in", category: "lodging", cost: 350, notes: "Checking in at Hotel Marincanto. Request a high room for the cliffside view.", location: "Positano" },
          { id: "act-2", time: "19:30", title: "Dinner at Chez Black", category: "food", cost: 110, notes: "Famous sea urchin pasta and local white wine.", location: "Spiaggia Grande, Positano" }
        ],
        "Day 2": [
          { id: "act-3", time: "08:30", title: "Bus to Bomerano trailhead", category: "transit", cost: 6, notes: "Buy tickets at the tabaccheria first.", location: "Positano SITA Stop" },
          { id: "act-4", time: "09:30", title: "Hike Path of the Gods", category: "activities", cost: 0, notes: "Hike from Bomerano to Nocelle. Takes about 3-4 hours. Breathtaking views.", location: "Sentiero degli Dei" },
          { id: "act-5", time: "13:30", title: "Lunch at Trattoria Santa Croce", category: "food", cost: 45, notes: "Reward yourself with lemon handmade pasta.", location: "Nocelle" }
        ],
        "Day 3": [
          { id: "act-6", time: "09:00", title: "Capri Island Boat Charter", category: "activities", cost: 220, notes: "Sailing through Faraglioni Rocks, swim stops included.", location: "Positano Pier" },
          { id: "act-7", time: "14:30", title: "Explore Anacapri & Chairlift", category: "activities", cost: 25, notes: "Take chairlift up to Mount Solaro for 360-degree panorama.", location: "Anacapri" },
          { id: "act-8", time: "17:00", title: "Handmade Sandals Shopping", category: "shopping", cost: 85, notes: "Custom-made sandals crafted in 15 minutes.", location: "Capri Town" }
        ],
        "Day 4": [
          { id: "act-9", time: "10:00", title: "Beach Bed Lounge Day", category: "lodging", cost: 50, notes: "Reserved front row beds at Spiaggia Grande.", location: "Positano beach" },
          { id: "act-10", time: "13:00", title: "Lunch at Da Adolfo", category: "food", cost: 75, notes: "Take the private boat shuttle with the red fish logo to the hidden cove.", location: "Laurito Beach" }
        ],
        "Day 5": [
          { id: "act-11", time: "10:30", title: "Taxi to Ravello", category: "transit", cost: 40, notes: "Scenic cliffside drive up to the hilltop town.", location: "Positano to Ravello" },
          { id: "act-12", time: "12:00", title: "Villa Rufolo Gardens", category: "activities", cost: 12, notes: "Beautiful historic gardens overhanging the sea.", location: "Ravello" }
        ],
        "Day 6": [
          { id: "act-13", time: "08:15", title: "Pompeii Ruins Day Trip", category: "activities", cost: 65, notes: "Guided archaeological tour of the historic Roman town.", location: "Pompeii Excavation Site" },
          { id: "act-14", time: "18:00", title: "Limoncello Tasting Tour", category: "food", cost: 30, notes: "Learn how Amalfi lemons are distilled.", location: "Sorrento" }
        ],
        "Day 7": [
          { id: "act-15", time: "10:00", title: "Souvenir Shopping & Packing", category: "shopping", cost: 40, notes: "Get local ceramics, lemon soaps, and olive oil.", location: "Positano shops" },
          { id: "act-16", time: "13:00", title: "Naples Airport Shuttle", category: "transit", cost: 110, notes: "Private driver pick up from hotel.", location: "Positano to Naples" }
        ]
      },
      packing: [
        { id: "pack-1", category: "Essentials", item: "Passport & ID", checked: true },
        { id: "pack-2", category: "Essentials", item: "Travel insurance printout", checked: true },
        { id: "pack-3", category: "Essentials", item: "Credit cards & Euros", checked: false },
        { id: "pack-4", category: "Clothing", item: "Linen shirts & shorts", checked: true },
        { id: "pack-5", category: "Clothing", item: "Swimwear & sunhat", checked: true },
        { id: "pack-6", category: "Clothing", item: "Good walking/hiking shoes", checked: false },
        { id: "pack-7", category: "Electronics", item: "Phone charger & powerbank", checked: false },
        { id: "pack-8", category: "Electronics", item: "Universal adapter plug", checked: true },
        { id: "pack-9", category: "Toiletries", item: "SPF 50 Sunscreen", checked: false },
        { id: "pack-10", category: "Toiletries", item: "Toothbrush & toothpaste", checked: false }
      ],
      journal: [
        {
          id: "journ-1",
          date: "2026-07-01",
          title: "Arrived in Heaven",
          location: "Hotel Marincanto, Positano",
          text: "The drive from Naples airport was winding and slightly terrifying, but the moment we stepped onto our balcony, it was all worth it. The vertical cliffs dotted with pastel houses look exactly like a postcard. Dinner at Chez Black was amazing—the vibe is unmatched and the sea urchin pasta was incredible.",
          image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=600&q=80"
        },
        {
          id: "journ-2",
          date: "2026-07-03",
          title: "Sailing Round Capri",
          location: "Faraglioni Rocks, Capri",
          text: "Wired up early to board our boat. Sailing through the giant arch of the Faraglioni rocks was spectacular. We anchored in a secluded emerald cove and swam in the crystal clear waters. Anacapri felt much quieter and peaceful. Sitting on the chairlift up to Mt. Solaro felt like floating over the world.",
          image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80"
        }
      ]
    }
  ]
};

// Global Application State Manager
class VoyageApp {
  constructor() {
    this.state = this.loadState();
    this.activeDay = "Day 1";
    this.theme = localStorage.getItem("voyage-theme") || "light";

    // Bindings
    this.initElements();
    this.applyTheme();
    this.registerEventListeners();
    
    // Initial Render
    this.render();
  }

  // Load from LocalStorage or use fallback
  loadState() {
    const saved = localStorage.getItem("voyage-state");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved state, using default.", e);
      }
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  // Save state to LocalStorage
  saveState() {
    localStorage.setItem("voyage-state", JSON.stringify(this.state));
    this.render();
  }

  // DOM Elements Caching
  initElements() {
    // Nav Links & Views
    this.navLinks = document.querySelectorAll(".nav-link");
    this.viewSections = document.querySelectorAll(".view-section");
    this.themeToggleBtn = document.getElementById("themeToggleBtn");
    
    // Selectors
    this.tripSelector = document.getElementById("tripSelector");
    
    // Hero details
    this.heroTitle = document.getElementById("heroTitle");
    this.heroDates = document.getElementById("heroDates");
    this.heroBudgetVal = document.getElementById("heroBudgetVal");
    this.heroImage = document.getElementById("heroImage");

    // Dashboard widgets
    this.dashTotalBudget = document.getElementById("dashTotalBudget");
    this.dashTotalSpent = document.getElementById("dashTotalSpent");
    this.dashRemainingBudget = document.getElementById("dashRemainingBudget");
    this.dashRemainingText = document.getElementById("dashRemainingText");
    this.dashProgressRing = document.querySelector(".progress-ring-circle");
    this.dashProgressPct = document.getElementById("dashProgressPct");
    this.dashPackingBar = document.getElementById("dashPackingBar");
    this.dashPackingText = document.getElementById("dashPackingText");
    this.dashPackingList = document.getElementById("dashPackingList");
    this.dashActivitiesList = document.getElementById("dashActivitiesList");

    // Itinerary View
    this.itineraryDaysList = document.getElementById("itineraryDaysList");
    this.itineraryTimeline = document.getElementById("itineraryTimeline");
    this.activeDayTitle = document.getElementById("activeDayTitle");

    // Packing View
    this.packingGrid = document.getElementById("packingGrid");

    // Budget View
    this.budgetTotalVal = document.getElementById("budgetTotalVal");
    this.budgetSpentVal = document.getElementById("budgetSpentVal");
    this.budgetRemainingVal = document.getElementById("budgetRemainingVal");
    this.budgetSpentPct = document.getElementById("budgetSpentPct");
    this.budgetBreakdown = document.getElementById("budgetBreakdown");
    this.expenseTableBody = document.getElementById("expenseTableBody");

    // Journal View
    this.journalGrid = document.getElementById("journalGrid");

    // Modals
    this.modalOverlay = document.getElementById("modalOverlay");
    this.modalTitle = document.getElementById("modalTitle");
    this.modalBody = document.getElementById("modalBody");
    this.modalCloseBtn = document.getElementById("modalCloseBtn");
    this.modalSaveBtn = document.getElementById("modalSaveBtn");
    this.modalCancelBtn = document.getElementById("modalCancelBtn");
  }

  // Get active trip details
  getActiveTrip() {
    return this.state.trips.find(t => t.id === this.state.activeTripId) || this.state.trips[0];
  }

  // Get active currency symbol
  getCurrencySymbol() {
    const trip = this.getActiveTrip();
    return CURRENCY_SYMBOLS[trip.currency] || "$";
  }

  // Apply visual theme class
  applyTheme() {
    document.documentElement.setAttribute("data-theme", this.theme);
    localStorage.setItem("voyage-theme", this.theme);
    
    // Update theme toggle button text
    const textNode = this.themeToggleBtn.querySelector("span");
    const sunIcon = this.themeToggleBtn.querySelector(".sun-icon");
    const moonIcon = this.themeToggleBtn.querySelector(".moon-icon");
    
    if (this.theme === "dark") {
      textNode.textContent = "Light Mode";
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    } else {
      textNode.textContent = "Dark Mode";
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    }
  }

  // Bind UI interactive events
  registerEventListeners() {
    // Navigation switching
    this.navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        const targetView = link.getAttribute("data-view");
        this.switchView(targetView);
      });
    });

    // Theme Toggle
    this.themeToggleBtn.addEventListener("click", () => {
      this.theme = this.theme === "light" ? "dark" : "light";
      this.applyTheme();
    });

    // Active Trip Dropdown
    this.tripSelector.addEventListener("change", (e) => {
      this.state.activeTripId = e.target.value;
      const trip = this.getActiveTrip();
      const keys = Object.keys(trip.itinerary);
      this.activeDay = keys.length > 0 ? keys[0] : "";
      this.saveState();
    });

    // Close Modal triggers
    this.modalCloseBtn.addEventListener("click", () => this.hideModal());
    this.modalCancelBtn.addEventListener("click", () => this.hideModal());
    this.modalOverlay.addEventListener("click", (e) => {
      if (e.target === this.modalOverlay) this.hideModal();
    });
  }

  // Switch between navigation tabs
  switchView(viewName) {
    this.navLinks.forEach(link => {
      if (link.getAttribute("data-view") === viewName) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    this.viewSections.forEach(section => {
      if (section.id === `${viewName}View`) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });

    // Force updates on specific view transitions
    if (viewName === "dashboard") {
      this.renderDashboard();
    } else if (viewName === "itinerary") {
      this.renderItinerary();
    } else if (viewName === "packing") {
      this.renderPacking();
    } else if (viewName === "budget") {
      this.renderBudget();
    } else if (viewName === "journal") {
      this.renderJournal();
    }
  }

  // Major Render Director
  render() {
    this.renderTripSelector();
    this.renderHero();
    
    // Find active view to render
    const activeLink = document.querySelector(".nav-link.active");
    const activeView = activeLink ? activeLink.getAttribute("data-view") : "dashboard";
    this.switchView(activeView);
  }

  // Populate list of trips
  renderTripSelector() {
    this.tripSelector.innerHTML = "";
    this.state.trips.forEach(trip => {
      const option = document.createElement("option");
      option.value = trip.id;
      option.textContent = trip.destination;
      option.selected = trip.id === this.state.activeTripId;
      this.tripSelector.appendChild(option);
    });
  }

  // Render high-impact header
  renderHero() {
    const trip = this.getActiveTrip();
    this.heroTitle.textContent = trip.destination;
    
    const start = new Date(trip.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const end = new Date(trip.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    this.heroDates.textContent = `${start} - ${end}`;
    
    const symbol = this.getCurrencySymbol();
    this.heroBudgetVal.textContent = `${symbol}${trip.budget.toLocaleString()}`;

    // Apply custom generated image banner
    if (trip.bannerImage) {
      this.heroImage.src = trip.bannerImage;
      // Handle error fallback (if local banner isn't fully copied yet)
      this.heroImage.onerror = () => {
        this.heroImage.src = "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80";
      };
    } else {
      this.heroImage.src = "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80";
    }
  }

  // Calculation helpers
  calculateSpent(trip) {
    let spent = 0;
    // Walk over itinerary activities
    Object.values(trip.itinerary).forEach(dayActivities => {
      dayActivities.forEach(act => {
        spent += Number(act.cost || 0);
      });
    });
    return spent;
  }

  calculateCategoryBreakdown(trip) {
    const categories = { lodging: 0, food: 0, transit: 0, activities: 0, shopping: 0 };
    Object.values(trip.itinerary).forEach(dayActivities => {
      dayActivities.forEach(act => {
        const cat = act.category.toLowerCase();
        if (categories.hasOwnProperty(cat)) {
          categories[cat] += Number(act.cost || 0);
        } else {
          categories.shopping += Number(act.cost || 0);
        }
      });
    });
    return categories;
  }

  // 1. DASHBOARD VIEW RENDERER
  renderDashboard() {
    const trip = this.getActiveTrip();
    const symbol = this.getCurrencySymbol();

    // Stat numbers
    this.dashTotalBudget.textContent = `${symbol}${trip.budget.toLocaleString()}`;
    this.dashTotalSpent.textContent = `${symbol}${spent.toLocaleString()}`;
    this.dashRemainingBudget.textContent = `${symbol}${remaining.toLocaleString()}`;
    
    if (remaining < 0) {
      this.dashRemainingBudget.classList.add("danger");
      this.dashRemainingText.textContent = "Over budget";
    } else {
      this.dashRemainingBudget.classList.remove("danger");
      this.dashRemainingText.textContent = "Remaining budget";
    }

    // Circular SVG progress ring calculation
    const percentage = trip.budget > 0 ? Math.min(Math.round((spent / trip.budget) * 100), 100) : 0;
    this.dashProgressPct.textContent = `${percentage}%`;
    
    // Circle circumference = 2 * PI * R (R = 58 for circle view)
    const radius = 58;
    const circumference = 2 * Math.PI * radius;
    this.dashProgressRing.style.strokeDasharray = `${circumference}`;
    const offset = circumference - (percentage / 100) * circumference;
    this.dashProgressRing.style.strokeDashoffset = offset;

    // Highlight progress ring warning colors
    if (spent > trip.budget) {
      this.dashProgressRing.style.stroke = "var(--color-danger)";
    } else if (percentage > 85) {
      this.dashProgressRing.style.stroke = "var(--color-warning)";
    } else {
      this.dashProgressRing.style.stroke = "var(--accent-color)";
    }

    // Packing list preview
    const packing = trip.packing;
    const packedCount = packing.filter(p => p.checked).length;
    const packingPct = packing.length > 0 ? Math.round((packedCount / packing.length) * 100) : 0;
    this.dashPackingBar.style.width = `${packingPct}%`;
    this.dashPackingText.textContent = `${packedCount} of ${packing.length} items packed (${packingPct}%)`;

    // Render limited items list
    this.dashPackingList.innerHTML = "";
    const limitPacking = packing.slice(0, 4);
    limitPacking.forEach(p => {
      const li = document.createElement("li");
      li.className = `dashboard-list-item ${p.checked ? 'checked' : ''}`;
      li.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${p.checked ? 'var(--color-success)' : 'var(--text-muted)'}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          ${p.checked ? '<polyline points="20 6 9 17 4 12"></polyline>' : '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>'}
        </svg>
        <span>${p.item}</span>
      `;
      this.dashPackingList.appendChild(li);
    });

    // Upcoming / Today's activity list preview
    this.dashActivitiesList.innerHTML = "";
    const symbol = this.getCurrencySymbol();
    const firstDay = Object.keys(trip.itinerary)[0];
    if (firstDay && trip.itinerary[firstDay].length > 0) {
      trip.itinerary[firstDay].slice(0, 3).forEach(act => {
        const item = document.createElement("div");
        item.className = `activity-widget-item ${act.category}`;
        item.innerHTML = `
          <div class="activity-widget-time">${act.time}</div>
          <div class="activity-widget-details">
            <div class="activity-widget-title">${act.title}</div>
            <div class="activity-widget-meta">${act.location || 'General'} • ${symbol}${act.cost}</div>
          </div>
        `;
        this.dashActivitiesList.appendChild(item);
      });
    } else {
      this.dashActivitiesList.innerHTML = `<p style="font-size: 0.9rem; color: var(--text-muted);">No upcoming activities scheduled.</p>`;
    }
  }

  // 2. ITINERARY VIEW RENDERER
  renderItinerary() {
    const trip = this.getActiveTrip();
    const days = Object.keys(trip.itinerary);

    // Render day selectors
    this.itineraryDaysList.innerHTML = "";
    const symbol = this.getCurrencySymbol();
    days.forEach(day => {
      const btn = document.createElement("button");
      btn.className = `day-btn ${day === this.activeDay ? 'active' : ''}`;
      btn.setAttribute("data-day", day);
      
      // Calculate daily cost summary
      const cost = trip.itinerary[day].reduce((sum, a) => sum + Number(a.cost || 0), 0);
      
      btn.innerHTML = `
        <div class="day-btn-title">${day}</div>
        <div class="day-btn-desc">${trip.itinerary[day].length} events • ${symbol}${cost}</div>
      `;
      btn.addEventListener("click", () => {
        this.activeDay = day;
        this.renderItinerary();
      });
      this.itineraryDaysList.appendChild(btn);
    });

    // Active day title heading
    this.activeDayTitle.textContent = `${this.activeDay} Timeline`;

    // Render active day timeline events
    this.itineraryTimeline.innerHTML = "";
    const activities = trip.itinerary[this.activeDay] || [];
    
    // Sort activities by time
    activities.sort((a, b) => a.time.localeCompare(b.time));

    if (activities.length === 0) {
      this.itineraryTimeline.innerHTML = `
        <div class="empty-state">
          <svg class="empty-state-icon" viewBox="0 0 24 24" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <div class="empty-state-title">No events for this day</div>
          <div class="empty-state-desc">Start building your perfect travel schedule by adding activities.</div>
          <button class="btn btn-primary" onclick="app.showAddActivityModal()" data-testid="emptyAddActivityBtn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add First Event
          </button>
        </div>
      `;
      return;
    }

    const symbol = this.getCurrencySymbol();
    activities.forEach(act => {
      const div = document.createElement("div");
      div.className = "timeline-item";
      div.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-content">
            <div class="timeline-header">
              <span class="timeline-time">${act.time}</span>
              <span class="category-badge ${act.category}">${act.category}</span>
            </div>
            <h3 class="timeline-title">${act.title}</h3>
            ${act.notes ? `<p class="timeline-notes">${act.notes}</p>` : ''}
            <div class="timeline-meta">
              ${act.location ? `<span>
                <svg viewBox="0 0 24 24" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                ${act.location}
              </span>` : ''}
              <span>${symbol}${act.cost}</span>
            </div>
          </div>
          <div class="timeline-actions">
            <button class="action-btn" onclick="app.showEditActivityModal('${act.id}')" title="Edit Activity">
              <svg viewBox="0 0 24 24" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="action-btn btn-delete" onclick="app.deleteActivity('${act.id}')" title="Delete Activity">
              <svg viewBox="0 0 24 24" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        </div>
      `;
      this.itineraryTimeline.appendChild(div);
    });
  }

  // 3. PACKING CHECKLIST RENDERER
  renderPacking() {
    const trip = this.getActiveTrip();
    const categories = [...new Set(trip.packing.map(item => item.category))];

    this.packingGrid.innerHTML = "";
    categories.forEach(cat => {
      const card = document.createElement("div");
      card.className = "card";
      
      const catItems = trip.packing.filter(item => item.category === cat);
      const packedCount = catItems.filter(item => item.checked).length;
      
      let itemsListHtml = "";
      catItems.forEach(item => {
        itemsListHtml += `
          <li class="packing-item">
            <label class="packing-item-checkbox-container">
              <input type="checkbox" class="packing-checkbox" ${item.checked ? 'checked' : ''} onchange="app.togglePackingItem('${item.id}')" data-testid="pack-chk-${item.id}">
              <span class="packing-item-text">${item.item}</span>
            </label>
            <button class="packing-item-delete" onclick="app.deletePackingItem('${item.id}')" title="Delete Item">
              <svg viewBox="0 0 24 24" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </li>
        `;
      });

      card.innerHTML = `
        <div class="packing-category-header">
          <h3 class="packing-category-title">${cat}</h3>
          <span class="packing-category-badge">${packedCount}/${catItems.length}</span>
        </div>
        <ul class="packing-list">
          ${itemsListHtml}
        </ul>
        <div class="add-packing-item-inline">
          <input type="text" placeholder="Add custom item..." class="inline-input" id="add-pack-input-${cat.replace(/\s+/g, '')}" onkeydown="if(event.key === 'Enter') app.addPackingItem('${cat}')">
          <button class="btn btn-secondary" style="padding: 0.5rem 0.75rem;" onclick="app.addPackingItem('${cat}')">+</button>
        </div>
      `;
      this.packingGrid.appendChild(card);
    });
  }

  // Packing list state triggers
  togglePackingItem(itemId) {
    const trip = this.getActiveTrip();
    const item = trip.packing.find(p => p.id === itemId);
    if (item) {
      item.checked = !item.checked;
      this.saveState();
    }
  }

  addPackingItem(category) {
    const trip = this.getActiveTrip();
    const inputId = `add-pack-input-${category.replace(/\s+/g, '')}`;
    const input = document.getElementById(inputId);
    const value = input.value.trim();
    if (!value) return;

    trip.packing.push({
      id: "pack-" + Date.now(),
      category: category,
      item: value,
      checked: false
    });

    input.value = "";
    this.saveState();
  }

  deletePackingItem(itemId) {
    const trip = this.getActiveTrip();
    trip.packing = trip.packing.filter(p => p.id !== itemId);
    this.saveState();
  }

  // 4. BUDGET VIEW RENDERER
  renderBudget() {
    const trip = this.getActiveTrip();
    const spent = this.calculateSpent(trip);
    const remaining = trip.budget - spent;
    const spentPct = trip.budget > 0 ? Math.round((spent / trip.budget) * 100) : 0;

    const symbol = this.getCurrencySymbol();

    this.budgetTotalVal.textContent = `${symbol}${trip.budget.toLocaleString()}`;
    this.budgetSpentVal.textContent = `${symbol}${spent.toLocaleString()}`;
    this.budgetRemainingVal.textContent = `${symbol}${remaining.toLocaleString()}`;
    this.budgetSpentPct.textContent = `${spentPct}% of budget spent`;

    if (remaining < 0) {
      this.budgetRemainingVal.style.color = "var(--color-danger)";
    } else {
      this.budgetRemainingVal.style.color = "var(--text-primary)";
    }

    // Category Breakdown Bars
    const breakdowns = this.calculateCategoryBreakdown(trip);
    this.budgetBreakdown.innerHTML = "";
    const symbol = this.getCurrencySymbol();
    
    Object.keys(breakdowns).forEach(cat => {
      const amount = breakdowns[cat];
      const percent = spent > 0 ? Math.round((amount / spent) * 100) : 0;
      
      const div = document.createElement("div");
      div.className = "budget-breakdown-item";
      div.innerHTML = `
        <div class="budget-breakdown-meta">
          <div class="category-dot-lbl">
            <span class="dot ${cat}"></span>
            <span style="text-transform: capitalize;">${cat}</span>
          </div>
          <span>${symbol}${amount.toLocaleString()} (${percent}%)</span>
        </div>
        <div class="budget-bar-bg">
          <div class="budget-bar ${cat}" style="width: ${percent}%"></div>
        </div>
      `;
      this.budgetBreakdown.appendChild(div);
    });

    // Render expense detailed table
    this.expenseTableBody.innerHTML = "";
    let expenseRows = [];
    
    // Gather all activities that cost money (> 0)
    Object.keys(trip.itinerary).forEach(day => {
      trip.itinerary[day].forEach(act => {
        if (Number(act.cost) >= 0) {
          expenseRows.push({
            day: day,
            title: act.title,
            category: act.category,
            cost: Number(act.cost),
            location: act.location || "General"
          });
        }
      });
    });

    if (expenseRows.length === 0) {
      this.expenseTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No expenses recorded yet.</td></tr>`;
      return;
    }

    // Sort expenses by amount descending
    expenseRows.sort((a, b) => b.cost - a.cost);
    const symbol = this.getCurrencySymbol();

    expenseRows.forEach(exp => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${exp.title}</strong></td>
        <td><span class="category-badge ${exp.category}">${exp.category}</span></td>
        <td>${exp.day}</td>
        <td>${exp.location}</td>
        <td><strong>${symbol}${exp.cost.toLocaleString()}</strong></td>
      `;
      this.expenseTableBody.appendChild(tr);
    });
  }

  // 5. JOURNAL VIEW RENDERER
  renderJournal() {
    const trip = this.getActiveTrip();
    this.journalGrid.innerHTML = "";

    if (trip.journal.length === 0) {
      this.journalGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <svg class="empty-state-icon" viewBox="0 0 24 24" stroke-width="1.5">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
          </svg>
          <div class="empty-state-title">Your travel journal is empty</div>
          <div class="empty-state-desc">Write down memories, thoughts, and food logs to capture your trip forever.</div>
          <button class="btn btn-primary" onclick="app.showAddJournalModal()" data-testid="emptyAddJournalBtn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Write First Entry
          </button>
        </div>
      `;
      return;
    }

    // Sort journal entries by date
    trip.journal.sort((a, b) => b.date.localeCompare(a.date));

    trip.journal.forEach(entry => {
      const card = document.createElement("div");
      card.className = "journal-card";
      
      const localDate = new Date(entry.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
      
      card.innerHTML = `
        <div class="journal-img-wrapper">
          <img class="journal-img" src="${entry.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80'}" alt="${entry.title}">
          <div class="journal-date">${localDate}</div>
        </div>
        <div class="journal-card-body">
          <h3 class="journal-card-title">${entry.title}</h3>
          <p class="journal-card-text">${entry.text}</p>
          <div class="journal-card-footer">
            <div class="journal-card-location">
              <svg viewBox="0 0 24 24" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ${entry.location || 'General'}
            </div>
            <button class="action-btn btn-delete" onclick="app.deleteJournalEntry('${entry.id}')" title="Delete Entry" style="width: 28px; height: 28px; border-radius: 4px;">
              <svg viewBox="0 0 24 24" stroke-width="2" style="width: 14px; height: 14px;"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      `;
      this.journalGrid.appendChild(card);
    });
  }

  // Journal deletions
  deleteJournalEntry(entryId) {
    const trip = this.getActiveTrip();
    trip.journal = trip.journal.filter(j => j.id !== entryId);
    this.saveState();
  }

  // MODAL UTILITIES
  showModal(title, bodyHtml, onSave) {
    this.modalTitle.textContent = title;
    this.modalBody.innerHTML = bodyHtml;
    this.modalOverlay.classList.add("active");
    
    // Unbind previous save listeners
    const newSaveBtn = this.modalSaveBtn.cloneNode(true);
    this.modalSaveBtn.parentNode.replaceChild(newSaveBtn, this.modalSaveBtn);
    this.modalSaveBtn = newSaveBtn;
    
    this.modalSaveBtn.addEventListener("click", () => {
      if (onSave()) this.hideModal();
    });
  }

  hideModal() {
    this.modalOverlay.classList.remove("active");
  }

  // Activity Modification Forms
  showAddActivityModal() {
      const symbol = this.getCurrencySymbol();
      const html = `
      <div class="form-group">
        <label class="form-label" for="act-title">Event Title *</label>
        <input type="text" id="act-title" class="form-control" placeholder="e.g., Dinner at Chez Black" required>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="act-time">Time *</label>
          <input type="time" id="act-time" class="form-control" value="09:00" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="act-cost">Cost (${symbol}) *</label>
          <input type="number" id="act-cost" class="form-control" value="0" min="0" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="act-cat">Category *</label>
          <select id="act-cat" class="form-control">
            <option value="activities">Activities</option>
            <option value="food">Food</option>
            <option value="lodging">Lodging</option>
            <option value="transit">Transit</option>
            <option value="shopping">Shopping</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label" for="act-loc">Location</label>
          <input type="text" id="act-loc" class="form-control" placeholder="e.g., Positano beach">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="act-notes">Notes / Reminders</label>
        <textarea id="act-notes" class="form-control" placeholder="Reservation is under Name..."></textarea>
      </div>
    `;

    this.showModal("Add Itinerary Event", html, () => {
      const title = document.getElementById("act-title").value.trim();
      const time = document.getElementById("act-time").value;
      const cost = Number(document.getElementById("act-cost").value);
      const category = document.getElementById("act-cat").value;
      const location = document.getElementById("act-loc").value.trim();
      const notes = document.getElementById("act-notes").value.trim();

      if (!title || !time) {
        alert("Please enter a title and select a time.");
        return false;
      }

      const trip = this.getActiveTrip();
      if (!trip.itinerary[this.activeDay]) {
        trip.itinerary[this.activeDay] = [];
      }

      trip.itinerary[this.activeDay].push({
        id: "act-" + Date.now(),
        time,
        title,
        category,
        cost,
        location,
        notes
      });

      this.saveState();
      return true;
    });
  }

  showEditActivityModal(activityId) {
    const trip = this.getActiveTrip();
    const act = trip.itinerary[this.activeDay].find(a => a.id === activityId);
    if (!act) return;

    const symbol = this.getCurrencySymbol();
    const html = `
      <div class="form-group">
        <label class="form-label" for="act-title">Event Title *</label>
        <input type="text" id="act-title" class="form-control" value="${act.title}" required>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="act-time">Time *</label>
          <input type="time" id="act-time" class="form-control" value="${act.time}" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="act-cost">Cost (${symbol}) *</label>
          <input type="number" id="act-cost" class="form-control" value="${act.cost}" min="0" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="act-cat">Category *</label>
          <select id="act-cat" class="form-control">
            <option value="activities" ${act.category === 'activities' ? 'selected' : ''}>Activities</option>
            <option value="food" ${act.category === 'food' ? 'selected' : ''}>Food</option>
            <option value="lodging" ${act.category === 'lodging' ? 'selected' : ''}>Lodging</option>
            <option value="transit" ${act.category === 'transit' ? 'selected' : ''}>Transit</option>
            <option value="shopping" ${act.category === 'shopping' ? 'selected' : ''}>Shopping</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label" for="act-loc">Location</label>
          <input type="text" id="act-loc" class="form-control" value="${act.location || ''}">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="act-notes">Notes / Reminders</label>
        <textarea id="act-notes" class="form-control">${act.notes || ''}</textarea>
      </div>
    `;

    this.showModal("Edit Itinerary Event", html, () => {
      const title = document.getElementById("act-title").value.trim();
      const time = document.getElementById("act-time").value;
      const cost = Number(document.getElementById("act-cost").value);
      const category = document.getElementById("act-cat").value;
      const location = document.getElementById("act-loc").value.trim();
      const notes = document.getElementById("act-notes").value.trim();

      if (!title || !time) {
        alert("Please enter a title and select a time.");
        return false;
      }

      act.title = title;
      act.time = time;
      act.cost = cost;
      act.category = category;
      act.location = location;
      act.notes = notes;

      this.saveState();
      return true;
    });
  }

  deleteActivity(activityId) {
    if (!confirm("Are you sure you want to delete this event?")) return;
    const trip = this.getActiveTrip();
    trip.itinerary[this.activeDay] = trip.itinerary[this.activeDay].filter(a => a.id !== activityId);
    this.saveState();
  }

  // Journal creation
  showAddJournalModal() {
    const html = `
      <div class="form-group">
        <label class="form-label" for="j-title">Entry Title *</label>
        <input type="text" id="j-title" class="form-control" placeholder="e.g., Sailing Capri Coast" required>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="j-date">Date *</label>
          <input type="date" id="j-date" class="form-control" value="2026-07-01" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="j-loc">Location</label>
          <input type="text" id="j-loc" class="form-control" placeholder="e.g., Capri Island">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="j-img">Photo URL (Optional)</label>
        <input type="url" id="j-img" class="form-control" placeholder="https://images.unsplash.com/...">
      </div>
      <div class="form-group">
        <label class="form-label" for="j-text">Write your memories...</label>
        <textarea id="j-text" class="form-control" placeholder="Describe the food, sunset, and things you discovered..."></textarea>
      </div>
    `;

    this.showModal("New Journal Entry", html, () => {
      const title = document.getElementById("j-title").value.trim();
      const date = document.getElementById("j-date").value;
      const location = document.getElementById("j-loc").value.trim();
      const image = document.getElementById("j-img").value.trim();
      const text = document.getElementById("j-text").value.trim();

      if (!title || !date) {
        alert("Please provide a title and date.");
        return false;
      }

      const trip = this.getActiveTrip();
      trip.journal.push({
        id: "journ-" + Date.now(),
        date,
        title,
        location,
        image: image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80",
        text
      });

      this.saveState();
      return true;
    });
  }

  // Manage new trip creations
  showAddTripModal() {
    const html = `
      <div class="form-group">
        <label class="form-label" for="trip-dest">Destination *</label>
        <input type="text" id="trip-dest" class="form-control" placeholder="e.g., Kyoto, Japan" required>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="trip-start">Start Date *</label>
          <input type="date" id="trip-start" class="form-control" value="2026-07-01" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="trip-end">End Date *</label>
          <input type="date" id="trip-end" class="form-control" value="2026-07-07" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="trip-currency">Currency *</label>
          <select id="trip-currency" class="form-control">
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="JPY">JPY (¥)</option>
            <option value="GBP">GBP (£)</option>
            <option value="AUD">AUD (A$)</option>
            <option value="CAD">CAD (C$)</option>
            <option value="CHF">CHF (CHF)</option>
            <option value="INR">INR (₹)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label" for="trip-budget">Total Budget *</label>
          <input type="number" id="trip-budget" class="form-control" value="2000" min="0" required>
        </div>
      </div>
    `;

    this.showModal("Create New Trip", html, () => {
      const destination = document.getElementById("trip-dest").value.trim();
      const startDate = document.getElementById("trip-start").value;
      const endDate = document.getElementById("trip-end").value;
      const budget = Number(document.getElementById("trip-budget").value);
      const currency = document.getElementById("trip-currency").value;

      if (!destination || !startDate || !endDate) {
        alert("Destination and dates are required.");
        return false;
      }

      // Calculate days difference
      const start = new Date(startDate);
      const end = new Date(endDate);
      const daysCount = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;

      if (daysCount <= 0) {
        alert("End date must be on or after start date.");
        return false;
      }

      const id = "trip-" + Date.now();
      const itinerary = {};
      
      // Initialize days keys
      for (let i = 1; i <= daysCount; i++) {
        itinerary[`Day ${i}`] = [];
      }

      this.state.trips.push({
        id,
        destination,
        startDate,
        endDate,
        budget,
        currency,
        bannerImage: "",
        itinerary,
        packing: [
          { id: "pack-" + Date.now() + 1, category: "Essentials", item: "Passport & ID", checked: false },
          { id: "pack-" + Date.now() + 2, category: "Essentials", item: "Credit cards & Cash", checked: false },
          { id: "pack-" + Date.now() + 3, category: "Clothing", item: "Underwear & Socks", checked: false }
        ],
        journal: []
      });

      this.state.activeTripId = id;
      this.activeDay = "Day 1";
      this.saveState();
      return true;
    });
  }
}

// Global Instantation
let app;
window.addEventListener("DOMContentLoaded", () => {
  app = new VoyageApp();
  // Expose internationally to allow HTML onclicks
  window.app = app;
});
