/** @jsx h */
import { h } from '../../core/dom';
import { Icon } from '../icons';

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
