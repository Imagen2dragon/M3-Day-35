import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { isValidEthiopianPhone } from "../api/dishes";
import Button from "../ui/Button";

function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const rawFrom = location.state?.from;
  const from = typeof rawFrom === "string"
    ? rawFrom
    : rawFrom?.pathname
      ? `${rawFrom.pathname}${rawFrom.search || ""}`
      : "/menu";

  const [form, setForm] = useState({ name: "", phone: "" });
  const [touched, setTouched] = useState({});

  if (user) {
    return <Navigate to={from} replace />;
  }

  const nameOk = form.name.trim().length > 1;
  const phoneOk = isValidEthiopianPhone(form.phone);
  const canSubmit = nameOk && phoneOk;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, phone: true });
    if (!canSubmit) return;
    login(form);
    navigate(from, { replace: true });
  }

  return (
    <section className="card checkout-card">
      <p className="eyebrow">Sign in</p>
      <h2>Log in to check out</h2>
      <p className="muted">
        After login you return to <code>{from}</code>.
      </p>

      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          required
        />
        {touched.name && !nameOk && (
          <p className="field-error" role="alert">
            Enter your name
          </p>
        )}

        <label htmlFor="phone">TeleBirr number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
          placeholder="09xxxxxxxx"
          required
        />
        {touched.phone && !phoneOk && (
          <p className="field-error" role="alert">
            Use 09xxxxxxxx or +2519xxxxxxxx
          </p>
        )}

        <Button type="submit" disabled={!canSubmit}>
          Continue
        </Button>
      </form>
    </section>
  );
}

export default Login;
