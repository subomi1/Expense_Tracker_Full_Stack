import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, onClose, isOpen }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (isOpen) {
      !modal.open && modal.showModal(); // open if not already open
    } else {
      modal.open && modal.close(); // close if open
    }
  }, [isOpen]);

  return createPortal(
    <dialog className="modal border-2 border-[#A8A2A3]" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}