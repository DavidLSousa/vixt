/** @jsx h */
import { h } from '../../core/dom';

export const Header = ({ 
  brand, 
  links = [], 
  actions,
  children,
  fixed = false, 
  transparent = false, 
  className = '',
  ...rest
}: { 
  brand: any; 
  links?: { text: string; href: string }[]; 
  actions?: any;
  children?: any;
  fixed?: boolean;
  transparent?: boolean;
  className?: string;
  [key: string]: any;
}) => {
  const baseClass = `vixt-header ${fixed ? 'vixt-header--fixed' : ''} ${transparent ? 'vixt-header--transparent' : ''}`;
  
  const closeMenu = () => {
    const checkbox = document.getElementById('vixt-mobile-menu-toggle') as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  };
  
  return (
    <header className={`${baseClass} ${className}`.trim()} {...rest}>
      <div className="vixt-container vixt-flex vixt-flex--between vixt-flex--align-center">
        <div className="vixt-header__left">
          <div className="vixt-header__brand">{brand}</div>
        </div>

        <div className="vixt-header__right vixt-flex vixt-flex--align-center">
          {actions && <div className="vixt-header__actions">{actions}</div>}

          {/* Mobile First Checkbox Hack */}
          <input type="checkbox" id="vixt-mobile-menu-toggle" className="vixt-header__toggle-input" />
          
          {/* Overlay para fechar ao clicar fora */}
          <label htmlFor="vixt-mobile-menu-toggle" className="vixt-header__overlay"></label>

          <label htmlFor="vixt-mobile-menu-toggle" className="vixt-header__toggle-label">
            <span className="vixt-header__toggle-icon">☰</span>
          </label>

          <nav className="vixt-header__nav" onClick={closeMenu}>
            <ul className="vixt-header__nav-list">
              {links.map(link => (
                <li className="vixt-header__nav-item">
                  <a href={link.href} className="vixt-header__nav-link">{link.text}</a>
                </li>
              ))}
              {children}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
