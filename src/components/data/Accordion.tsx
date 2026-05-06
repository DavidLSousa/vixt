/** @jsx h */
import { h } from '../../core/dom';

export interface AccordionItemProps {
  id: string;
  title: any;
  children?: any;
  isOpen?: boolean;
  onToggle?: (id: string) => void;
  className?: string;
  key?: string | number;
}

export const AccordionItem = ({ 
  id, 
  title, 
  children, 
  isOpen = false, 
  onToggle,
  className = '' 
}: AccordionItemProps) => {
  return (
    <div className={`vixt-accordion-item ${isOpen ? 'vixt-accordion-item--open' : ''} ${className}`}>
      <button 
        type="button" 
        className="vixt-accordion-header"
        onClick={() => onToggle && onToggle(id)}
        aria-expanded={isOpen}
      >
        <span className="vixt-accordion-title">{title}</span>
        <span className="vixt-accordion-icon">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
      <div className="vixt-accordion-content-wrapper">
        <div className="vixt-accordion-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export interface AccordionProps {
  items: { id: string; title: any; content: any }[];
  activeId?: string | string[];
  allowMultiple?: boolean;
  onChange?: (id: string | string[]) => void;
  className?: string;
}

export const Accordion = ({ 
  items, 
  activeId, 
  allowMultiple = false, 
  onChange,
  className = '' 
}: AccordionProps) => {
  const handleToggle = (id: string) => {
    if (!onChange) return;

    if (allowMultiple) {
      const currentActive = Array.isArray(activeId) ? activeId : (activeId ? [activeId] : []);
      const nextActive = currentActive.includes(id)
        ? currentActive.filter(i => i !== id)
        : [...currentActive, id];
      onChange(nextActive);
    } else {
      onChange(activeId === id ? '' : id);
    }
  };

  return (
    <div className={`vixt-accordion ${className}`}>
      {items.map(item => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          isOpen={allowMultiple 
            ? (Array.isArray(activeId) && activeId.includes(item.id)) 
            : activeId === item.id
          }
          onToggle={handleToggle}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};
