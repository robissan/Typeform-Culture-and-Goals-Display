import {
  Component,
  type ComponentType,
  type ErrorInfo,
  type ReactNode,
} from 'react';
import { KioskChrome } from '@/components/kiosk/KioskChrome';

export interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  FallbackComponent?: ComponentType<ErrorFallbackProps>;
  /** Changing this clears a caught error. Pass the route to recover on navigation. */
  resetKey?: unknown;
}

interface ErrorBoundaryState {
  error: Error | null;
}

function toError(value: unknown): Error {
  if (value instanceof Error) return value;
  if (typeof value === 'string') return new Error(value);
  try {
    return new Error(JSON.stringify(value));
  } catch {
    return new Error(String(value));
  }
}

const home = import.meta.env.BASE_URL || '/';

function DefaultFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <KioskChrome screen="people" live="This chapter hit an error.">
      <section className="kx-main" aria-labelledby="h-error">
        <div className="kx-numtag"><b>/00</b><span>Error</span></div>
        <h1 id="h-error" className="kx-big">This chapter hit an error.</h1>
        <p className="kx-note">The rest of the display can still be opened. People is the first chapter.</p>
        {import.meta.env.DEV ? (
          <pre className="kx-note">{error.message || String(error)}</pre>
        ) : null}
        <p className="kx-step">
          <button type="button" className="kx-btn" onClick={resetError}>Try again</button>
          <a className="kx-btn" href={home}>Back to People</a>
        </p>
      </section>
    </KioskChrome>
  );
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { error: toError(error) };
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', toError(error), info.componentStack);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (this.state.error !== null && prevProps.resetKey !== this.props.resetKey) {
      this.resetError();
    }
  }

  resetError = (): void => {
    this.setState({ error: null });
  };

  render(): ReactNode {
    const { error } = this.state;
    if (error === null) return this.props.children;
    const Fallback = this.props.FallbackComponent ?? DefaultFallback;
    return <Fallback error={error} resetError={this.resetError} />;
  }
}
