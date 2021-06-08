import {  FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root') as HTMLElement;

const Modal: FC = ({ children }) => {
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    const current = el.current;
    modalRoot!.appendChild(current);
    return () => {
      modalRoot!.removeChild(current);
    }
  }, [])

  return createPortal(children, el.current);
}

export default Modal
