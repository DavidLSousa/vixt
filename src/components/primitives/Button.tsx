/** @jsx h */
import { h } from '../../core/dom';

export const Button = ({ 
  children, 
  onClick, 
  className = '', 
  type = 'button',
  style = '',
  ...rest
}: { 
  children?: any; 
  onClick?: (e: Event) => void; 
  className?: string; 
  type?: 'button' | 'submit';
  style?: string | any;
  [key: string]: any;
}) => {
  return (
    <button type={type} className={`vixt-btn ${className}`} onClick={onClick} style={style} {...rest}>
      {children}
    </button>
  );
};
