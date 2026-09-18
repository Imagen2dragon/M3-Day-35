import { useSearchParams } from "react-router-dom";
import { fetchDishes, getCategories } from "../api/dishes";
import { useFetch } from "../hooks/useFetch";
import { useCartStore } from "../cart/cartStore";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import Spinner from "../ui/Spinner";
import ErrorNote from "../ui/ErrorNote";

function Menu() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "All";
  const fail = params.get("fail") === "1";
  const addItem = useCartStore((s) => s.addItem);

  const { data: dishes, loading, error, retry } = useFetch(
    (signal) => fetchDishes({ fail, signal }),
    [fail]
  );

  function chooseCategory(next) {
    const nextParams = {};
    if (next !== "All") nextParams.category = next;
    if (fail) nextParams.fail = "1";
    setParams(nextParams);
  }

  if (loading) return <Spinner label="Loading today's menu…" />;
  if (error) return <ErrorNote message={error} onRetry={retry} />;

  const visible =
    category === "All"
      ? dishes || []
      : (dishes || []).filter((dish) => dish.category === category);

  return (
    <section>
      <div className="section-head">
        <div>
          <p className="eyebrow">Menu</p>
          <h2>Today&apos;s dishes</h2>
        </div>
        <p className="muted">
          Filter in the URL:{" "}
          <code>?category={category === "All" ? "…" : category}</code>
        </p>
      </div>

      <CategoryBar
        categories={getCategories()}
        selected={category}
        onSelect={chooseCategory}
      />

      <DishList dishes={visible} onAdd={addItem} />
    </section>
  );
}

export default Menu;
