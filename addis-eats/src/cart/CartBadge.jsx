import { useCartStore } from "./cartStore";

function CartBadge() {
  const items = useCartStore((s) => s.items);
  const count = (items || []).length;

  if (!count) return null;

  return <span className="user-chip">🛒 {count}</span>;
}

export default CartBadge;
