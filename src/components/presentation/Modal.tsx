/** @jsx h */
import { h } from '../../core/dom';

export const Modal = ({ id, title, children }: { id: string; title: string; children?: any }) => {
  return (
    <div id={id} className="modal hidden">
      <div className="modal-overlay"></div>
      <div className="modal-container">
        <div className="modal-header">
          <h3>{title}</h3>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};
