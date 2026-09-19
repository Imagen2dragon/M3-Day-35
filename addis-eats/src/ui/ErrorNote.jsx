import Button from "./Button";

function ErrorNote({ message, onRetry }) {
  return (
    <div className="state-card card error-card" role="alert">
      <h2>Could not load data</h2>
      <p>{message}</p>
      {onRetry && (
        <Button onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}

export default ErrorNote;
