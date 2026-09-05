import React, { useEffect } from "react";

// Simple, reusable feedback banner.
// type can be "success" or "error"
const Alert = ({ type = "success", message, onClose }) => {
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(() => {
      onClose && onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>
      <button className="alert-close" onClick={onClose} aria-label="Close">
        &times;
      </button>
    </div>
  );
};

export default Alert;
