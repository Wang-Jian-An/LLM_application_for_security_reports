import React, { useState, useEffect } from 'react'
import { useLocation, Navigate } from "react-router-dom";

function ErrorBoundary({children}) {
    const [hasError, setHasError] = useState(false);
    const location = useLocation();
    useEffect(() => {
      if (hasError) {
        setHasError(false);
      }
    }, [location.key]);
    return (
      /**
       * NEW: The class component error boundary is now
       *      a child of the functional component.
       */
      (<ErrorBoundaryInner 
        hasError={hasError} 
        setHasError={setHasError}
      >
        {children}
      </ErrorBoundaryInner> 
      )
    );
  }
  
  /**
   * NEW: The class component accepts getters and setters for
   *      the parent functional component's error state.
   */
  class ErrorBoundaryInner extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(_error) {
      return { hasError: true };
    }
  
    componentDidUpdate(prevProps, _previousState) {
      if(!this.props.hasError && prevProps.hasError) {
        this.setState({ hasError: false });
      }
    }
  
    componentDidCatch(_error, _errorInfo) {
      this.props.setHasError(true);
    }
  
    render() {
      return this.state.hasError
        ? (<Navigate to="/" replace={true}/>)
        : this.props.children; 
    }
  }

export default ErrorBoundary;