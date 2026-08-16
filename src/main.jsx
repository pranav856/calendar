import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Critical Application Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#0B0E14',
          color: '#FFD700',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          textAlign: 'center',
          fontFamily: 'sans-serif'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>🛕 The Tirumala Verse App</h2>
          <p style={{ color: '#ffffff', fontSize: '14px', maxWidth: '400px', marginBottom: '20px' }}>
            A temporary display error occurred. Click below to clear stored caches and reload fresh data.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                backgroundColor: '#FF5722',
                color: '#ffffff',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🔄 Reload App
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                backgroundColor: '#141923',
                color: '#FFD700',
                border: '1px solid #D4AF37',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🧹 Reset Cache & Reload
            </button>
          </div>
          {this.state.error && (
            <pre style={{
              marginTop: '30px',
              padding: '12px',
              backgroundColor: '#141923',
              borderRadius: '8px',
              color: '#FF4D6D',
              fontSize: '11px',
              textAlign: 'left',
              maxWidth: '90vw',
              overflowX: 'auto'
            }}>
              {String(this.state.error.stack || this.state.error)}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // navigator.serviceWorker.register('/sw.js').then((registration) => {
    //   registration.update();
    //   console.log('SW registered & updated successfully:', registration.scope);
    // }).catch((err) => {
    //   console.log('SW registration failed:', err);
    // });
  });
}
