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
// PUBLIC_INTERFACE
function DashboardSection() {
  /** Dashboard with snapshot + lead management placeholder */
  return (
    <section>
      <h2>Lead Management Dashboard</h2>
      <p>
        Filterable &amp; sortable list of all inquiries. <br />
        [Dashboard table/list and filters placeholder]
      </p>
    </section>
  );
}

// PUBLIC_INTERFACE
function InquiriesSection() {
  /** Manual inquiry entry + detail management placeholder */
  return (
    <section>
      <h2>Manual Inquiry Entry</h2>
      <p>
        Dealers can manually enter new inquiries here.
        <br />
        [Form placeholder: name, contact, location, property type, budget, notes]
      </p>
    </section>
  );
}

// PUBLIC_INTERFACE
function AgentsSection() {
  /** Lead assignment & status tracking placeholder */
  return (
    <section>
      <h2>Lead Assignment &amp; Status Tracking</h2>
      <p>
        Assign inquiries, update statuses, add internal notes/tags.
        <br />
        [Assignment/status controls placeholder]
      </p>
    </section>
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