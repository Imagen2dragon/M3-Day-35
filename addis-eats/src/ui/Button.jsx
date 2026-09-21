function Button({
  children,
  type = "button",
  variant = "primary",
  size = "normal",
  className = "",
  disabled = false,
  onClick,
  ...props
}) {
  const classes = [
    "btn",
    variant === "ghost" ? "ghost" : "",
    size === "small" ? "small" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

