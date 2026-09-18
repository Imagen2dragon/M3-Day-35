import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="card">
      <h2>Page not found</h2>
      <p>That path is not on the Roommate Birr route map.</p>
      <Link to="/">Back to dashboard</Link>
    </section>
  );
}

export default NotFound;
