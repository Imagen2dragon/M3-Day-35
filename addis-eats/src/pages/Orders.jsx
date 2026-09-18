import { Link, useLocation } from "react-router-dom";
import EmptyState from "../ui/EmptyState";

function readOrders() {
  try {
    return JSON.parse(localStorage.getItem("addis-eats-orders") || "[]");
  } catch {
    return [];
  }
}

function Orders() {
  const location = useLocation();
  const placed = location.state?.placed;
  const orders = readOrders();

  if (!orders.length && !placed) {
    return (
      <EmptyState
        title="No orders yet"
        message="Place a checkout and your receipts will show up here."
        action={
          <Link className="btn" to="/menu">
            Browse menu
          </Link>
        }
      />
    );
  }

  const list = orders.length ? orders : [placed];

  return (
    <section>
      <div className="section-head">
        <div>
          <p className="eyebrow">Orders</p>
          <h2>Recent receipts</h2>
        </div>
      </div>

      {placed && (
        <p className="card" style={{ marginBottom: "1rem" }}>
          ✅ Order #{placed.id} confirmed for {placed.area} · {placed.total} ETB
        </p>
      )}

      <ul className="order-list">
        {list.map((order) => (
          <li key={order.id} className="card">
            <div>
              <strong>
                #{order.id} · {order.customer}
              </strong>
              <p className="muted">
                {order.area} · {order.payment} · {(order.items || []).length}{" "}
                item(s)
              </p>
            </div>
            <p className="price">{order.total} ETB</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Orders;
