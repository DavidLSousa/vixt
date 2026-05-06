/** @jsx h */
import { h } from '../../core/dom';

export interface TabItem {
  id: string;
  label: string;
  content: any;
  icon?: any;
}

export const Tabs = ({ 
  items, 
  activeTab, 
  onChange,
  className = '',
  style = '',
  ...rest
}: { 
  items: TabItem[]; 
  activeTab: string; 
  onChange: (id: string) => void;
  className?: string;
  style?: string | any;
  [key: string]: any;
}) => {
  const activeContent = items.find(item => item.id === activeTab)?.content;

  return (
    <div className={`vixt-tabs ${className}`} style={style} {...rest}>
      <div className="vixt-tabs__list" role="tablist">
        {items.map(item => (
          <button
            key={item.id}
            role="tab"
            aria-selected={activeTab === item.id}
            className={`vixt-tabs__trigger ${activeTab === item.id ? 'vixt-tabs__trigger--active' : ''}`}
            onClick={() => onChange(item.id)}
          >
            {item.icon && <span className="vixt-tabs__icon">{item.icon}</span>}
            {item.label}
          </button>
        ))}
      </div>
      <div className="vixt-tabs__content" role="tabpanel">
        {activeContent}
      </div>
    </div>
  );
};
