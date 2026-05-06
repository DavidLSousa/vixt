/** @jsx h */
import { h } from '../../core/dom';

export interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children?: any;
  className?: string;
  [key: string]: any;
}

export const Tooltip = ({ 
  content, 
  position = 'top', 
  children, 
  className = '',
  ...rest 
}: TooltipProps) => {
  return (
    <div className={`vixt-tooltip-wrapper ${className}`} {...rest}>
      {children}
      <div className={`vixt-tooltip vixt-tooltip--${position}`} role="tooltip">
        {content}
        <div className="vixt-tooltip__arrow" />
      </div>
    </div>
  );
};
