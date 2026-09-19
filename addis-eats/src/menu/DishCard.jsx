import { Link } from "react-router-dom";
import Button from "../ui/Button";

function DishCard({ dish, onAdd }) {
  return (
    <article className="card dish-card">
      {dish.spicy && <span className="badge">🌶️ Spicy</span>}
      <h3>
        <Link to={`/menu/${dish.id}`}>{dish.name}</Link>
      </h3>
      <p className="muted">{dish.category}</p>
      <p className="price">{dish.price} ETB</p>
      <div className="card-actions">
        <Link className="btn ghost small" to={`/menu/${dish.id}`}>
          Details
        </Link>
        <Button size="small" onClick={() => onAdd(dish)}>
          Add to order
        </Button>
      </div>
    </article>
  );
}

export default DishCard;
