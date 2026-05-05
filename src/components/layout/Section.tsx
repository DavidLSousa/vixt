/** @jsx h */
import { h } from '../../core/dom';

export const Section = ({ 
  children, 
  className = '', 
  id = '',
  padding = 'md',
  variant = 'default',
  fullWidth = false,
  ...rest
}: { 
  children?: any; 
  className?: string; 
  id?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'alternate' | 'highlight';
  fullWidth?: boolean;
  [key: string]: any;
}) => {
  const baseClass = `vixt-section vixt-section--pad-${padding} vixt-section--var-${variant} ${fullWidth ? 'vixt-section--full' : ''}`;
  return (
    <section id={id} className={`${baseClass} ${className}`.trim()} {...rest}>
      {children}
    </section>
  );
};
