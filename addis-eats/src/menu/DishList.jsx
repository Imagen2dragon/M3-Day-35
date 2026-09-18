import DishCard from "./DishCard";
import EmptyState from "../ui/EmptyState";

function DishList({ dishes, onAdd }) {
  if (!dishes?.length) {
    return (
      <EmptyState
        title="No dishes in this category"
        message="Try another filter — the kitchen still has plenty on the board."
      />
    );
  }

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} onAdd={onAdd} />
      ))}
    </div>
  );
}

export default DishList;
