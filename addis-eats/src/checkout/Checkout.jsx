import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useCartStore } from "../cart/cartStore";
import { AREAS, validateCheckout } from "./validate";
import Field from "./Field";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";

const INITIAL = {
  name: "",
  phone: "",
  area: "Bole",
  payment: "telebirr",
  notes: "",
};

function Checkout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const total = (items || []).reduce((sum, item) => sum + item.price, 0);

  const [form, setForm] = useState(() => ({
    ...INITIAL,
    name: user?.name || "",
    phone: user?.phone || "",
  }));
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo(() => validateCheckout(form), [form]);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function markTouched(field) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({
      name: true,
      phone: true,
      area: true,
      payment: true,
      notes: true,
    });

    if (!isValid || submitting || !(items || []).length) return;

    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 450));

      const order = {
        id: Date.now(),
        customer: form.name.trim(),
        phone: form.phone.trim(),
        area: form.area,
        payment: form.payment,
        notes: form.notes.trim(),
        items: [...items],
        total,
        createdAt: new Date().toISOString(),
      };

      const existing = JSON.parse(localStorage.getItem("addis-eats-orders") || "[]");
      localStorage.setItem(
        "addis-eats-orders",
        JSON.stringify([order, ...existing])
      );

      clear();
      navigate("/orders", { replace: true, state: { placed: order } });
    } finally {
      setSubmitting(false);
    }
  }

  if (!(items || []).length) {
    return (
      <EmptyState
        title="Nothing to check out"
        message="Your cart is empty — add dishes first."
        action={
          <Link className="btn" to="/menu">
            Browse menu
          </Link>
        }
      />
    );
  }

  return (
    <section className="card checkout-card">
      <p className="eyebrow">Checkout</p>
      <h2>Confirm delivery for {user?.name}</h2>
      <p className="muted">Order total: {total} ETB</p>

      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <Field
          id="name"
          label="Full name"
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={() => markTouched("name")}
          error={touched.name && errors.name}
        />

        <Field
          id="phone"
          label="TeleBirr / mobile number"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          onBlur={() => markTouched("phone")}
          error={touched.phone && errors.phone}
          hint="09xxxxxxxx or +2519xxxxxxxx"
        />

        <label htmlFor="area">Delivery area</label>
        <select
          id="area"
          name="area"
          value={form.area}
          onChange={handleChange}
          onBlur={() => markTouched("area")}
          aria-invalid={!!(touched.area && errors.area)}
        >
          {AREAS.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
        {touched.area && errors.area && (
          <p className="field-error" role="alert">
            {errors.area}
          </p>
        )}

        <fieldset>
          <legend>Payment</legend>
          {[
            ["telebirr", "TeleBirr"],
            ["cbebirr", "CBE Birr"],
            ["cash", "Cash on delivery"],
          ].map(([value, label]) => (
            <label key={value} style={{ display: "block", marginBottom: "0.35rem" }}>
              <input
                type="radio"
                name="payment"
                value={value}
                checked={form.payment === value}
                onChange={handleChange}
                onBlur={() => markTouched("payment")}
              />{" "}
              {label}
            </label>
          ))}
          {touched.payment && errors.payment && (
            <p className="field-error" role="alert">
              {errors.payment}
            </p>
          )}
        </fieldset>

        <label htmlFor="notes">Notes for the rider</label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={form.notes}
          onChange={handleChange}
          onBlur={() => markTouched("notes")}
        />
        {touched.notes && errors.notes && (
          <p className="field-error" role="alert">
            {errors.notes}
          </p>
        )}

        <Button type="submit" disabled={!isValid || submitting}>
          {submitting ? "Placing order…" : `Pay ${total} ETB`}
        </Button>
      </form>
    </section>
  );
}

export default Checkout;
