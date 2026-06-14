// app/components/Modal.js
"use client";
import { useEffect } from "react";

/**
 * Reusable Modal component.
 * Props:
 *  - isOpen: boolean to control visibility
 *  - onClose: callback when overlay or close button is clicked
 *  - children: modal content
 */
export default function Modal({ isOpen, onClose, children }) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

/*
  Basic styling (add to globals.css or component scoped CSS):
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .modal-content {
    background: var(--bg-primary);
    padding: 1.5rem;
    border-radius: 0.75rem;
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
    box-shadow: 0 4px 30px rgba(0,0,0,0.2);
  }
  .modal-close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-primary);
  }
*/
