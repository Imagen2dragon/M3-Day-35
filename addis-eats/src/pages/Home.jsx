import { Link } from "react-router-dom";
import { fetchDishes } from "../api/dishes";
import { useFetch } from "../hooks/useFetch";
import Spinner from "../ui/Spinner";
import ErrorNote from "../ui/ErrorNote";

function Home() {
  const { data: dishes, loading, error, retry } = useFetch(
    (signal) => fetchDishes({ signal }),
    []
  );

  const specials = (dishes || []).filter((dish) => dish.special).slice(0, 3);

  return (
    <section>
      <div className="hero card">
        <p className="eyebrow">Today in Bole</p>
        <h2>Habesha favorites, ready to order</h2>
        <p>
          Browse the menu, filter by category, open a dish, build your cart, and
          check out with a TeleBirr-ready form.
        </p>
        <div className="hero-actions">
          <Link className="btn" to="/menu">
            See today&apos;s menu
          </Link>
          <Link className="btn ghost" to="/menu?category=Vegan">
            Vegan dishes
          </Link>
        </div>
      </div>

      <div style={{ marginTop: "1.25rem" }}>
        <div className="section-head">
          <div>
            <p className="eyebrow">Specials</p>
            <h2>Kitchen picks</h2>
          </div>
        </div>

        {loading && <Spinner label="Loading specials…" />}
        {error && <ErrorNote message={error} onRetry={retry} />}
        {!loading && !error && (
          <div className="specials-grid">
            {specials.map((dish) => (
              <article key={dish.id} className="card">
                {dish.spicy && <span className="badge">🌶️ Spicy</span>}
                <h3>
                  <Link to={`/menu/${dish.id}`}>{dish.name}</Link>
                </h3>
                <p className="muted">{dish.description}</p>
                <p className="price">{dish.price} ETB</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
