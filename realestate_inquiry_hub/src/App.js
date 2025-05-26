import React, { useState } from 'react';
import './App.css';

// Theme color overrides
const theme = {
  primary: '#1A73E8',
  secondary: '#F5F7FA',
  accent: '#34A853',
};

// Top navigation items
const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "inquiries", label: "Inquiries" },
  { key: "agents", label: "Agents" },
  { key: "analytics", label: "Analytics" }
];

// Placeholder components for main sections
/**
 * Visually modern, card-like section wrapper with class for card styling.
 */
function CardSection({ className, title, children, ...props }) {
  return (
    <section className={`section card-elevated ${className || ""}`} {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

// PUBLIC_INTERFACE
function DashboardSection() {
  /**
   * Dashboard with snapshot + lead management placeholder,
   * including modernized filters & header.
   */
  return (
    <CardSection title="Lead Management Dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <span>All Inquiries</span>
        </div>
        <div className="dashboard-filters">
          <button className="btn btn-filter active">All</button>
          <button className="btn btn-filter">Open</button>
          <button className="btn btn-filter">Assigned</button>
          <button className="btn btn-filter">Closed</button>
        </div>
      </div>
      <div className="dashboard-table">
        <p>
          <span style={{ color: "#666", fontWeight: "500" }}>
            Filterable &amp; sortable list of all inquiries.
          </span>
          <br />
          <span style={{ color: "#a9a9a9" }}>
            [Dashboard table/list and filters placeholder]
          </span>
        </p>
      </div>
    </CardSection>
  );
}

/**
 * Manual inquiry entry + detail management in modern card.
 * This implementation includes a fully functional form and an active inquiries list below.
 */
function InquiriesSection({ inquiries, onAddInquiry }) {
  // Local state for form fields
  const [form, setForm] = React.useState({
    name: "",
    contact: "",
    location: "",
    propertyType: "",
    budget: "",
    notes: ""
  });
  const [error, setError] = React.useState(null);

  // PUBLIC_INTERFACE
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setError(null);
  }

  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim() || !form.location.trim() || !form.propertyType.trim() || !form.budget.trim()) {
      setError("All fields except notes are required.");
      return;
    }
    onAddInquiry({
      ...form,
      id: Date.now(),
      created: new Date().toISOString()
    });
    setForm({
      name: "",
      contact: "",
      location: "",
      propertyType: "",
      budget: "",
      notes: ""
    });
    setError(null);
  }

  // Inquiry list rendering
  function renderInquirySummary(inq) {
    return (
      <div key={inq.id} style={{border: "1px solid #e6eaf6", borderRadius: 8, padding: "16px 13px", marginBottom: 13, background: "#f8fafc"}}>
        <strong>{inq.name}</strong> <span style={{color:"#2196f3", marginLeft: 4, fontWeight: 500}}>({inq.contact})</span>
        <div style={{marginTop: 2, fontSize: "1em"}}>
          <span style={{marginRight:8}}>🏡 {inq.propertyType} | 📍 {inq.location}</span>
          <span style={{marginLeft:8}}>💰 {inq.budget}</span>
        </div>
        {inq.notes && (
          <div style={{marginTop:7, color: "#444", fontStyle:"italic", fontSize:".99em"}}>Notes: {inq.notes}</div>
        )}
        <div style={{marginTop: 2, fontSize: "0.90em", color: "#999"}}>
          Entered: {new Date(inq.created).toLocaleString()}
        </div>
      </div>
    );
  }

  return (
    <CardSection title="Manual Inquiry Entry">
      <form className="inquiry-form" onSubmit={handleSubmit} autoComplete="off">
        <div style={{display:"flex", flexWrap:"wrap", gap:"18px 24px", marginBottom: "16px"}}>
          <div style={{flex: "1 1 230px"}}>
            <label>
              Name<br/>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
                style={{width:"99%", padding:"7px 7px", borderRadius:"6px", border:"1px solid #cfd8dc"}}
                data-testid="inquiry-form-name"
              />
            </label>
          </div>
          <div style={{flex: "1 1 230px"}}>
            <label>
              Contact Info<br/>
              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="Phone or WhatsApp"
                required
                style={{width:"99%", padding:"7px 7px", borderRadius:"6px", border:"1px solid #cfd8dc"}}
                data-testid="inquiry-form-contact"
              />
            </label>
          </div>
          <div style={{flex: "1 1 185px"}}>
            <label>
              Location Preference<br/>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Downtown"
                required
                style={{width:"99%", padding:"7px 7px", borderRadius:"6px", border:"1px solid #cfd8dc"}}
                data-testid="inquiry-form-location"
              />
            </label>
          </div>
          <div style={{flex: "1 1 185px"}}>
            <label>
              Property Type<br/>
              <select
                name="propertyType"
                value={form.propertyType}
                onChange={handleChange}
                required
                style={{width:"99%", padding:"7px 7px", borderRadius:"6px", border:"1px solid #cfd8dc"}}
                data-testid="inquiry-form-propertyType"
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
          <div style={{flex: "1 1 120px"}}>
            <label>
              Budget<br/>
              <input
                type="text"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                placeholder="e.g. 12L - 15L"
                required
                style={{width:"99%", padding:"7px 7px", borderRadius:"6px", border:"1px solid #cfd8dc"}}
                data-testid="inquiry-form-budget"
              />
            </label>
          </div>
          <div style={{flex: "1 1 95%", marginTop: 2}}>
            <label>
              Notes<br/>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Add notes (optional)"
                rows={2}
                style={{width:"99%", padding:"7px 7px", borderRadius:"6px", border:"1px solid #cfd8dc", resize: "vertical", minHeight: "39px"}}
                data-testid="inquiry-form-notes"
              />
            </label>
          </div>
        </div>
        {error && <div style={{color:"#d32f2f", marginBottom:8}}>{error}</div>}
        <button className="btn btn-large" style={{marginTop:8, minWidth:150}} type="submit" data-testid="inquiry-form-submit">
          + Add Inquiry
        </button>
      </form>
      {inquiries && inquiries.length > 0 && (
        <div style={{marginTop:36}}>
          <h3 style={{marginBottom:"12px", color:"#1976d2", fontSize:"1.17em", fontWeight:"600"}}>Inquiries List</h3>
          <div>
            {inquiries.slice().reverse().map(renderInquirySummary)}
          </div>
        </div>
      )}
      {(!inquiries || inquiries.length === 0) && (
        <div style={{marginTop:34, color:"#8e98a5", fontStyle:"italic"}}>
          No manual inquiries have been added yet.
        </div>
      )}
    </CardSection>
  );
}

/**
 * Lead assignment & status tracking in modern card.
 */
function AgentsSection() {
  return (
    <CardSection title="Lead Assignment & Status Tracking">
      <div className="agent-status-controls">
        <p style={{ marginBottom: 10 }}>
          Assign inquiries, update statuses, add internal notes/tags.
        </p>
        <div className="form-placeholder" style={{ color: "#8e98a5", fontStyle: "italic" }}>
          [Assignment/status controls placeholder]
        </div>
        <button className="btn" style={{ marginTop: 12 }}>
          Assign Lead
        </button>
      </div>
    </CardSection>
  );
}

/**
 * Basic analytics in modern card.
 */
function AnalyticsSection() {
  return (
    <CardSection title="Basic Analytics">
      <div className="analytics-charts">
        <p style={{ marginBottom: 12 }}>
          Inquiry volume, status distribution, agent performance.
        </p>
        <div className="form-placeholder" style={{ color: "#8e98a5", fontStyle: "italic" }}>
          [Charts/analytics placeholder]
        </div>
      </div>
    </CardSection>
  );
}

 // PUBLIC_INTERFACE
function MainContainer() {
  /**
   * Main container for RealEstate Inquiry Hub.
   * Handles navigation and section display.
   * Manages top-level state for all manual inquiries.
   */
  const [activeTab, setActiveTab] = useState('dashboard');

  // Local state: array of inquiry objects
  const [inquiries, setInquiries] = React.useState([]);

  // Set theme colors as CSS variables on root (one-time effect)
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primary);
    root.style.setProperty('--secondary-color', theme.secondary);
    root.style.setProperty('--accent-color', theme.accent);
  }, []);

  // PUBLIC_INTERFACE
  function handleAddInquiry(newInq) {
    setInquiries((inquiries) => [...inquiries, newInq]);
  }

  function renderSection() {
    switch (activeTab) {
      case "dashboard": return <DashboardSection />;
      case "inquiries": return <InquiriesSection inquiries={inquiries} onAddInquiry={handleAddInquiry} />;
      case "agents": return <AgentsSection />;
      case "analytics": return <AnalyticsSection />;
      default: return <DashboardSection />;
    }
  }

  return (
    <div className="app">
      {/* Elevated, modern navbar */}
      <nav className="navbar glass-navbar">
        <div className="container nav-container">
          <div className="logo">
            <span className="logo-symbol">🏠</span>
            <span className="logo-title">RealEstate Inquiry Hub</span>
          </div>
          <ul className="nav-items">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.key}
                className={`nav-item${activeTab === item.key ? " active" : ""}`}
                onClick={() => setActiveTab(item.key)}
                tabIndex={0}
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <main>
        <div className="container main-content">
          {renderSection()}
          <div className="dev-placeholder-note">
            <em>All sections above are placeholders for future development.</em>
          </div>
        </div>
      </main>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Entry point for RealEstate Inquiry Hub */
  return <MainContainer />;
}

export default App;