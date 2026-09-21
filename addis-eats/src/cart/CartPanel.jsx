import Button from "../ui/Button";

function CartPanel({ items, onRemove }) {
  return (
    <ul className="cart-list">
      {items.map((item) => (
        <li key={item.lineId}>
          <div>
            <strong>{item.name}</strong>
            <span className="muted"> · {item.price} ETB</span>
          </div>
          <Button
            variant="ghost"
            size="small"
            onClick={() => onRemove(item.lineId)}
            aria-label={`Remove ${item.name} from cart`}
          >
            Remove
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default CartPanel;

