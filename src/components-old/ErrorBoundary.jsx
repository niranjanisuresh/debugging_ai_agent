import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    const logs = JSON.parse(localStorage.getItem('errorLogs') || '[]');
    const newLog = {
      message: error.toString(),
      stack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('errorLogs', JSON.stringify([...logs, newLog]));
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h3>⚠️ A component crashed. Check the logs below.</h3>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
