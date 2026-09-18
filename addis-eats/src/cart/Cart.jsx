import { Link } from "react-router-dom";
import { useCartStore } from "./cartStore";
import EmptyState from "../ui/EmptyState";

function Cart() {
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);
  const total = (items || []).reduce((sum, item) => sum + item.price, 0);

  if (!(items || []).length) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Add a few Habesha dishes from the menu."
        action={
          <Link className="btn" to="/menu">
            Browse menu
          </Link>
        }
      />
    );
  }

  return (
    <section className="card">
      <div className="section-head">
        <div>
          <p className="eyebrow">Cart</p>
          <h2>Your order</h2>
        </div>
        <button type="button" className="btn ghost small" onClick={clear}>
          Clear cart
        </button>
      </div>

      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.lineId}>
            <div>
              <strong>{item.name}</strong>
              <span className="muted"> · {item.price} ETB</span>
            </div>
            <button
              type="button"
              className="btn ghost small"
              onClick={() => remove(item.lineId)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <p className="total">Total: {total} ETB</p>
      <Link className="btn" to="/checkout">
        Go to checkout
      </Link>
    </section>
  );
}

export default Cart;
