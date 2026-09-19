import { Link, useParams } from "react-router-dom";
import { fetchDishById } from "../api/dishes";
import { useFetch } from "../hooks/useFetch";
import { useCartStore } from "../cart/cartStore";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import ErrorNote from "../ui/ErrorNote";
import EmptyState from "../ui/EmptyState";

function DishDetail() {
  const { id } = useParams();
  const dishId = Number(id);
  const addItem = useCartStore((s) => s.addItem);

  const { data: dish, loading, error, retry } = useFetch(
    (signal) => fetchDishById(dishId, { signal }),
    [dishId]
  );

  if (loading) return <Spinner label="Opening dish…" />;
  if (error) return <ErrorNote message={error} onRetry={retry} />;

  if (!dish) {
    return (
      <EmptyState
        title="Dish not found"
        message={`No dish matches id ${id}.`}
        action={
          <Link className="btn" to="/menu">
            Back to menu
          </Link>
        }
      />
    );
  }

  return (
    <section className="card detail-card">
      <p className="eyebrow">{dish.category}</p>
      <h2>
        {dish.name} {dish.spicy && <span aria-label="spicy">🌶️</span>}
      </h2>
      <p>{dish.description}</p>
      <p className="price">{dish.price} ETB</p>
      <div className="card-actions">
        <Button onClick={() => addItem(dish)}>
          Add to order
        </Button>
        <Link className="btn ghost" to="/menu">
          Back to menu
        </Link>
      </div>
      <p className="hint">
        <code>useParams()</code> returns a string — converted with{" "}
        <code>Number(id)</code>.
      </p>
    </section>
  );
}

export default DishDetail;
