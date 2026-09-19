import { Link, useParams } from "react-router-dom";

function Screen({ title, intent, dataNeeds }) {
  const { id } = useParams();

  return (
    <section className="card">
      <p className="kicker">Scaffold screen</p>
      <h2>
        {title} {id ? `(#${id})` : ""}
      </h2>
      <p>{intent}</p>
      <p className="muted">
        <strong>Data this screen will need:</strong> {dataNeeds}
      </p>

      {title === "Expenses" && (
        <div style={{ marginTop: "1rem" }}>
          <p>
            <strong>Sample dynamic route links:</strong>
          </p>
          <ul>
            <li>
              <Link
                to="/expenses/101"
                style={{ color: "#2563eb", textDecoration: "underline" }}
              >
                Expense #101: Shared Wi-Fi (600 ETB)
              </Link>
            </li>
            <li>
              <Link
                to="/expenses/102"
                style={{ color: "#2563eb", textDecoration: "underline" }}
              >
                Expense #102: Shiro &amp; Injera Lunch (180 ETB)
              </Link>
            </li>
          </ul>
        </div>
      )}

      {id && (
        <div style={{ marginTop: "1rem" }}>
          <p className="muted">
            Read parameter from URL via <code>useParams()</code>: id ={" "}
            <strong>{id}</strong>
          </p>
          <Link
            to="/expenses"
            style={{ color: "#2563eb", textDecoration: "underline" }}
          >
            &larr; Back to all expenses
          </Link>
        </div>
      )}
    </section>
  );
}

export default Screen;
