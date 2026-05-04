import { h } from '../core/dom';
import { Typography } from './primitives.tsx';
import { Icon } from './icons.tsx';

export const Card = ({ title, children }: { title: string; children?: any }) => {
  return (
    <div className="card">
      <Typography tag="h3">{title}</Typography>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

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

export const Modal = ({ id, title, children }: { id: string; title: string; children?: any }) => {
  return (
    <div id={id} className="modal hidden">
      <div className="modal-overlay"></div>
      <div className="modal-container">
        <div className="modal-header">
          <h3>{title}</h3>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Footer = ({
  brandText,
  columns = [],
  bottomText,
  socialLinks = [],
  developer,
  className = '',
  ...rest
}: {
  brandText?: any;
  columns?: { title: string; links: { text: string; href: string }[] }[];
  bottomText?: string;
  socialLinks?: { icon: any; href: string }[];
  developer?: { name: string; href: string };
  className?: string;
  [key: string]: any;
}) => {
  return (
    <footer className={`vixt-footer ${className}`.trim()} {...rest}>
      <div className="vixt-container">
        <div className="vixt-footer__top">
          {brandText && <div className="vixt-footer__brand">{brandText}</div>}
          
          <div className="vixt-footer__columns">
            {columns.map(col => (
              <div className="vixt-footer__column">
                <h4 className="vixt-footer__col-title">{col.title}</h4>
                <ul className="vixt-footer__col-list">
                  {col.links.map(link => (
                    <li><a href={link.href} className="vixt-footer__link">{link.text}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {(bottomText || socialLinks.length > 0 || developer) && (
          <div className="vixt-footer__bottom">
            <div className="vixt-footer__bottom-left">
              {bottomText && <p className="vixt-footer__copyright">{bottomText}</p>}
              {developer && (
                <p className="vixt-footer__developer">
                  Developed by <a href={developer.href} target="_blank" rel="noopener noreferrer">{developer.name}</a>
                </p>
              )}
            </div>
            {socialLinks.length > 0 && (
              <div className="vixt-footer__social">
                {socialLinks.map(social => (
                  <a href={social.href} className="vixt-footer__social-link" target="_blank" rel="noopener noreferrer">
                    {typeof social.icon === 'string' ? <Icon name={social.icon} /> : social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </footer>
  );
};
