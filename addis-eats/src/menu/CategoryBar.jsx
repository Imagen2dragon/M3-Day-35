function CategoryBar({ categories, selected, onSelect }) {
  return (
    <div className="chip-row" role="group" aria-label="Filter by category">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`chip ${selected === category ? "active" : ""}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;
