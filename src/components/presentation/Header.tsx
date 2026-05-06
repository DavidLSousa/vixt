/** @jsx h */
import { h } from '../../core/dom';

export interface HeaderProps {
  brand: any;
  links?: { text: string; href: string }[];
  actions?: any;
  children?: any;
  fixed?: boolean;
  transparent?: boolean;
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: (open: boolean) => void;
  className?: string;
  [key: string]: any;
}

export const Header = ({ 
  brand, 
  links = [], 
  actions,
  children,
  fixed = false, 
  transparent = false, 
  isMobileMenuOpen = false,
  onMobileMenuToggle,
  className = '',
  ...rest
}: HeaderProps) => {
  const baseClass = `vixt-header ${fixed ? 'vixt-header--fixed' : ''} ${transparent ? 'vixt-header--transparent' : ''} ${isMobileMenuOpen ? 'vixt-header--mobile-open' : ''}`;
  
  const handleToggle = () => {
    if (onMobileMenuToggle) {
      onMobileMenuToggle(!isMobileMenuOpen);
    }
  };

  const closeMenu = () => {
    if (onMobileMenuToggle) {
      onMobileMenuToggle(false);
    }
  };
  
  return (
    <header className={`${baseClass} ${className}`.trim()} {...rest}>
      <div className="vixt-container vixt-flex vixt-flex--between vixt-flex--align-center">
        <div className="vixt-header__left">
          <div className="vixt-header__brand">{brand}</div>
        </div>

        <div className="vixt-header__right vixt-flex vixt-flex--align-center">
          {actions && <div className="vixt-header__actions">{actions}</div>}

          {/* Overlay para fechar ao clicar fora */}
          {isMobileMenuOpen && (
            <div className="vixt-header__overlay" onClick={closeMenu}></div>
          )}

          <button type="button" className="vixt-header__toggle-btn" onClick={handleToggle}>
            <span className="vixt-header__toggle-icon">{isMobileMenuOpen ? '✕' : '☰'}</span>
          </button>

          <nav className={`vixt-header__nav ${isMobileMenuOpen ? 'vixt-header__nav--open' : ''}`} onClick={closeMenu}>
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
