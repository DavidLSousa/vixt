/** @jsx h */
import { h } from '../../core/dom';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline';

export const Badge = ({ 
  children, 
  variant = 'default', 
  className = '',
  style = '',
  ...rest
}: { 
  children?: any; 
  variant?: BadgeVariant; 
  className?: string;
  style?: string | any;
  [key: string]: any;
}) => {
  const variantClass = `vixt-badge--${variant}`;
  
  return (
    <span 
      className={`vixt-badge ${variantClass} ${className}`} 
      style={style}
      {...rest}
    >
      {children}
    </span>
  );
};
