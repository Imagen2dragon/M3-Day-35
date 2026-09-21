import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./auth/useAuth";
import CartBadge from "./cart/CartBadge";
import Button from "./ui/Button";

function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            🍲
          </span>
          <div>
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
              <Button variant="ghost" size="small" onClick={logout}>
                Log out
              </Button>
            </>
          ) : (
            <NavLink
              to="/login"
              state={{ from: location }}
              className="btn small"
            >
              Sign in
            </NavLink>
          )}
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Addis Eats</p>
      </footer>
    </div>
  );
}

export default Layout;
