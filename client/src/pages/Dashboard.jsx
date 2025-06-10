function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>My Recordings</h2>
      </header>
      <div className="dashboard-content">
        <div className="recordings-list">
          {/* Recordings will be listed here */}
          <p>No recordings yet. Start by installing our browser extension.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
