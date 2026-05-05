/** @jsx h */
import { h } from '../../core/dom';

export const Flex = ({ children, className = '' }: { children?: any; className?: string }) => {
  return <div className={`flex ${className}`}>{children}</div>;
};
