import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "./cartStore";
import CartPanel from "./CartPanel";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import EmptyState from "../ui/EmptyState";

function Cart() {
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);
  const total = (items || []).reduce((sum, item) => sum + item.price, 0);

  // State design (Day 35 brief): "Whether a modal is open -> The component that opens it"
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

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
        <Button
          variant="ghost"
          size="small"
          onClick={() => setConfirmClearOpen(true)}
        >
          Clear cart
        </Button>
      </div>

      <CartPanel items={items} onRemove={remove} />

      <p className="total">Total: {total} ETB</p>
      <Link className="btn" to="/checkout">
        Go to checkout
      </Link>

      <Modal
        isOpen={confirmClearOpen}
        title="Clear your order?"
        onClose={() => setConfirmClearOpen(false)}
      >
        <p>Are you sure you want to remove all dishes from your cart?</p>
        <div className="card-actions" style={{ justifyContent: "flex-end" }}>
          <Button
            variant="ghost"
            size="small"
            onClick={() => setConfirmClearOpen(false)}
          >
            Keep items
          </Button>
          <Button
            size="small"
            onClick={() => {
              clear();
              setConfirmClearOpen(false);
            }}
          >
            Yes, clear cart
          </Button>
        </div>
      </Modal>
    </section>
  );
}

export default Cart;
