import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand">
          <span aria-hidden="true">💸</span>
          <div>
            <p className="kicker">Shared flat · ETB</p>
            <h1>Roommate Birr</h1>
          </div>
        </div>
        <nav className="site-nav" aria-label="Main">
          <NavLink to="/" end>
            Dashboard
          </NavLink>
          <NavLink to="/expenses">Expenses</NavLink>
          <NavLink to="/expenses/new">Add expense</NavLink>
          <NavLink to="/settlements">Settlements</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Roommate Birr · Capstone scaffold · Day 35</p>
      </footer>
    </div>
  );
}

export default Layout;
