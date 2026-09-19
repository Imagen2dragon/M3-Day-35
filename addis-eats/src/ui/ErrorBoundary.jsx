import { Component } from "react";
import Button from "./Button";

class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Addis Eats boundary caught:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback || (
          <section className="card state-card">
            <h2>Something broke in the kitchen</h2>
            <p>An unexpected render error stopped this screen.</p>
            <Button onClick={() => this.setState({ error: null })}>
              Try again
            </Button>
          </section>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
