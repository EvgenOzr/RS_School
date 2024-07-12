import React from 'react';
import './Error-indicator.css'

const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <span className="error">Error</span>
            <span>
                An error occured!
            </span>
        </div>
    );
};

export default ErrorIndicator;