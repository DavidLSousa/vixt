/** @jsx h */
import { h } from '../../core/dom';

export const Grid = ({ children, className = '' }: { children?: any; className?: string }) => {
  return <div className={`grid ${className}`}>{children}</div>;
};
