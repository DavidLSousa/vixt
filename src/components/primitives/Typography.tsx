/** @jsx h */
import { h } from '../../core/dom';

export const Typography = ({ 
  children, 
  tag: Tag = 'p', 
  className = '',
  style = '',
  ...rest
}: { 
  children?: any; 
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'; 
  className?: string;
  style?: string | any;
  [key: string]: any;
}) => {
  return <Tag className={className} style={style} {...rest}>{children}</Tag>;
};
