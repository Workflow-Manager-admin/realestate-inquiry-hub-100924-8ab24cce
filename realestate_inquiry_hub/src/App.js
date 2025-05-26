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
 */
function InquiriesSection() {
  return (
    <CardSection title="Manual Inquiry Entry">
      <div className="inquiry-form">
        <p style={{ marginBottom: 12 }}>
          Dealers can manually enter new inquiries here.
        </p>
        <div className="form-placeholder" style={{ color: "#8e98a5", fontStyle: "italic" }}>
          [Form placeholder: name, contact, location, property type, budget, notes]
        </div>
        <button className="btn btn-large" style={{ marginTop: 22, minWidth: 150 }}>
          + Add Inquiry
        </button>
      </div>
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

// PUBLIC_INTERFACE
function AnalyticsSection() {
  /** Basic analytics placeholder */
  return (
    <section>
      <h2>Basic Analytics</h2>
      <p>
        Inquiry volume, status distribution, agent performance.
        <br />
        [Charts/analytics placeholder]
      </p>
    </section>
  );
}

// PUBLIC_INTERFACE
function MainContainer() {
  /**
   * Main container for RealEstate Inquiry Hub.
   * Handles navigation and section display.
   */
  const [activeTab, setActiveTab] = useState('dashboard');

  // Set theme colors as CSS variables on root (one-time effect)
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primary);
    root.style.setProperty('--secondary-color', theme.secondary);
    root.style.setProperty('--accent-color', theme.accent);
  }, []);

  function renderSection() {
    switch (activeTab) {
      case "dashboard": return <DashboardSection />;
      case "inquiries": return <InquiriesSection />;
      case "agents": return <AgentsSection />;
      case "analytics": return <AnalyticsSection />;
      default: return <DashboardSection />;
    }
  }

  return (
    <div className="app" style={{ background: "var(--secondary-color)" }}>
      <nav className="navbar" style={{ background: "var(--primary-color)", color: "#fff" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="logo" style={{ color: "#fff" }}>
            <span className="logo-symbol" style={{ color: "var(--accent-color)" }}>🏠</span>
            <span style={{ fontWeight: 700, letterSpacing: 1 }}>RealEstate Inquiry Hub</span>
          </div>
          <ul style={{
            margin: 0, padding: 0, display: "flex", gap: 24, listStyle: "none",
            fontWeight: 500, fontSize: "1rem"
          }}>
            {NAV_ITEMS.map((item) => (
              <li
                key={item.key}
                style={{
                  cursor: "pointer",
                  color: activeTab === item.key ? "var(--accent-color)" : "#fff",
                  borderBottom: activeTab === item.key ? "3px solid var(--accent-color)" : "3px solid transparent",
                  paddingBottom: 2,
                  transition: "color 0.2s"
                }}
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
        <div className="container" style={{ marginTop: 110, paddingBottom: 64 }}>
          {renderSection()}
          <div style={{ marginTop: 32, color: "#888", fontSize: "0.95em" }}>
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