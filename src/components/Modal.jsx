/* eslint-disable react/prop-types */
import "./../styles/modal.css";

function Modal({ isVisible, children }) {
  if (!isVisible) return;
    return (
        <div>
            <div className="modal-bg" />
        <div className="modal-container">{children}</div>
      </div>
    );
}

export default Modal;
