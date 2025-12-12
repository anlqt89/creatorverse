import "./Popup.css"
function DeletePopup({ open, onClose, children }) {
    if (!open) return null;
  
    return (
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  }
  
  export default DeletePopup;