import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '30px',
          margin: '20px',
          background: '#FFF5F5',
          border: '2px solid #FEB2B2',
          borderRadius: '12px',
          color: '#9B2C2C',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '10px', color: '#9B2C2C' }}>
            {this.props.fallbackTitle || 'Something went wrong rendering this component.'}
          </h2>
          <p style={{ fontWeight: 600, color: '#C53030', marginBottom: '16px' }}>
            {this.state.error?.toString()}
          </p>
          <pre style={{
            background: '#2D3748',
            color: '#CBD5E0',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            overflowX: 'auto',
            maxHeight: '300px'
          }}>
            {this.state.errorInfo?.componentStack || this.state.error?.stack}
          </pre>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false, error: null, errorInfo: null });
              window.location.reload();
            }}
            style={{
              marginTop: '16px',
              background: '#E53E3E',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 20px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
