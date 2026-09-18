import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./auth/useAuth";
import CartBadge from "./cart/CartBadge";

function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            🍲
          </span>
          <div>
            <p className="brand-kicker">Addis Ababa</p>
            <h1>Addis Eats</h1>
          </div>
        </div>

        <nav className="site-nav" aria-label="Main">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/cart">
            Cart <CartBadge />
          </NavLink>
          <NavLink to="/checkout">Checkout</NavLink>
          <NavLink to="/orders">Orders</NavLink>
        </nav>

        <div className="auth-slot">
          {user ? (
            <>
              <span className="user-chip">Hi, {user.name}</span>
              <button type="button" className="btn ghost small" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <NavLink to="/login" className="btn small">
              Sign in
            </NavLink>
          )}
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Addis Eats · Day 35 mini-project · prices in ETB</p>
      </footer>
    </div>
  );
}

export default Layout;
