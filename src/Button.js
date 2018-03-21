import React from 'react';
import './Button.css';
function Button({ onClick, className, children }) {
  return (
      <button className={`btn ${className}`} onClick={onClick}>{children}</button>
  );
}

export default Button;
