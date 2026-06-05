import { Component, type ReactNode, type ErrorInfo } from 'react';
import { Button } from '../components/ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary] Caught render error:', error);
    console.error('[ErrorBoundary] Component stack:', info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: '16px',
            textAlign: 'center',
            padding: '24px',
            background: '#000',
            color: '#FDFDFD',
            fontFamily: 'Poppins, system-ui, sans-serif',
          }}
        >
          <div style={{ fontSize: '48px' }}>⚠️</div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Something went wrong</h2>

          <p
            style={{
              fontSize: '0.875rem',
              color: '#A4A7AE',
              maxWidth: '560px',
              backgroundColor: '#0D1117',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #252B37',
              wordBreak: 'break-word',
            }}
          >
            {this.state.error?.message ?? 'Unknown error'}
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
          
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              style={{
                height: '44px',
                padding: '0 16px',
                borderRadius: '9999px',
                background: '#961200',
                color: '#FDFDFD',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              Clear cache &amp; reload
            </button>

            <button
              onClick={() => window.location.reload()}
              style={{
                height: '44px',
                padding: '0 16px',
                borderRadius: '9999px',
                background: 'rgba(10,13,18,0.6)',
                color: '#FDFDFD',
                border: '1px solid #252B37',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
