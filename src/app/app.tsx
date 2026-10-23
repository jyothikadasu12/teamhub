
import { NavLink, Outlet } from "react-router";

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="app-brand" to="/">
          <span className="app-brand__mark">T</span>
          <span>TeamHub</span>
        </NavLink>

        <nav className="app-nav" aria-label="Main navigation">
          <NavLink to="/" end>
            Dashboard
          </NavLink>
          <NavLink to="/employees">
            Employees
          </NavLink>
          <NavLink to="/documents">
            Documents
          </NavLink>
          <NavLink to="/reports">
            Reports
          </NavLink>
        </nav>

        <div className="app-profile" title="Signed-in user">
          JD
        </div>
      </header>

      <Outlet />

      <footer className="app-footer">
        TeamHub · Employee and document workspace
      </footer>
    </div>
  );
}

export default App;
