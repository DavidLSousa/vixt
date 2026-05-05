/** @jsx h */
import { h } from '../../core/dom';

export const Container = ({ children, className = '' }: { children?: any; className?: string }) => {
  return <div className={`vixt-container ${className}`.trim()}>{children}</div>;
};
