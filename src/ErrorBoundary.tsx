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
        <div>
          <p>{this.state.error.message}</p>
          <p>{this.state.info.componentStack}</p>
        </div>
      );
    }
    else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
