export default function Modal({ isOpen, title, onClose, onSave, children }) {
  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay active" 
      onClick={(e) => {
        if (e.target.classList.contains('modal-overlay')) {
          onClose();
        }
      }}
    >
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
