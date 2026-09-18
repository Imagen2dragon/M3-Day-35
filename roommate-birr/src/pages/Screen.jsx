function Screen({ title, intent, dataNeeds }) {
  return (
    <section className="card">
      <p className="kicker">Scaffold screen</p>
      <h2>{title}</h2>
      <p>{intent}</p>
      <p className="muted">
        <strong>Data this screen will need:</strong> {dataNeeds}
      </p>
    </section>
  );
}

export default Screen;
