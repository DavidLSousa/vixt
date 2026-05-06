/** @jsx h */
import { h, Fragment } from '../../core/dom';

export interface DropdownItem {
  label?: string;
  onClick?: () => void;
  icon?: any;
  divider?: boolean;
  className?: string;
}

export interface DropdownProps {
  trigger: any;
  items: DropdownItem[];
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  position?: 'left' | 'right';
  className?: string;
  [key: string]: any;
}

export const Dropdown = ({ 
  trigger, 
  items, 
  isOpen,
  onToggle,
  position = 'right',
  className = '',
  ...rest 
}: DropdownProps) => {
  
  const handleTriggerClick = (e: any) => {
    e.stopPropagation();
    onToggle(!isOpen);
  };

  return (
    <div className={`vixt-dropdown ${className} ${isOpen ? 'vixt-dropdown--open' : ''}`} {...rest}>
      <div className="vixt-dropdown__trigger" onClick={handleTriggerClick}>
        {trigger}
      </div>
      
      {isOpen && (
        <div className={`vixt-dropdown__menu vixt-dropdown__menu--${position}`}>
          {items.map((item, index) => (
            <Fragment key={index}>
              {item.divider ? (
                <div className="vixt-dropdown__divider" />
              ) : (
                <div 
                  className={`vixt-dropdown__item ${item.className || ''}`}
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    onToggle(false);
                  }}
                >
                  {item.icon && <span className="vixt-dropdown__item-icon">{item.icon}</span>}
                  <span className="vixt-dropdown__item-label">{item.label}</span>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
