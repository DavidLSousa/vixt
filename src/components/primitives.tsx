import { h } from '../core/dom';

export const Typography = ({ 
  children, 
  tag: Tag = 'p', 
  className = '' 
}: { 
  children?: any; 
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'; 
  className?: string 
}) => {
  return <Tag className={className}>{children}</Tag>;
};

export const Button = ({ 
  children, 
  onClick, 
  className = '', 
  type = 'button' 
}: { 
  children?: any; 
  onClick?: (e: Event) => void; 
  className?: string; 
  type?: 'button' | 'submit' 
}) => {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export const Image = ({ src, alt, className = '' }: { src: string; alt: string; className?: string }) => {
  return <img src={src} alt={alt} className={className} loading="lazy" />;
};

export const Link = ({ children, href, className = '' }: { children?: any; href: string; className?: string }) => {
  return <a href={href} className={className}>{children}</a>;
};
