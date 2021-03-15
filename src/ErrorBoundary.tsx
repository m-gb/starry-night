import React, { Component } from 'react';

interface ErrorBoundaryState {
  error?: any,
  info?: any
}

class ErrorBoundary extends Component<{}, ErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      error: undefined,
      info: undefined
    };
  }

  componentDidCatch(error: Error, info: any) {
    this.setState({
      error: error,
      info: info
    });
  }

  render() {
    if(this.state.error) {
      return (
        <div className="text-light error-background">
          <h3 className="error-message">{this.state.error.message}</h3>
        </div>
      );
    }
    else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
