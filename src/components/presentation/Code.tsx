/** @jsx h */
import { h } from '../../core/dom';
import { Icon } from '../icons';

export interface CodeProps {
  code: string;
  language?: string;
  showCopy?: boolean;
  className?: string;
  style?: string | any;
  [key: string]: any;
}

export const Code = ({ 
  code, 
  language, 
  showCopy = true,
  className = '',
  style = '',
  ...rest
}: CodeProps) => {
  
  const handleCopy = (e: any) => {
    const btn = e.currentTarget;
    const originalContent = btn.innerHTML;
    
    navigator.clipboard.writeText(code).then(() => {
      // Feedback visual simples
      btn.innerHTML = '<span style="color: var(--vixt-success, #10b981); font-size: 0.7rem; font-weight: bold;">Copied!</span>';
      setTimeout(() => {
        btn.innerHTML = originalContent;
      }, 2000);
    });
  };

  return (
    <div className={`vixt-code-card ${className}`} style={style} {...rest}>
      {language && <div className="vixt-code-card__lang">{language}</div>}
      
      {showCopy && (
        <button 
          className="vixt-code-card__copy" 
          onClick={handleCopy}
          title="Copy code"
        >
          <Icon name="copy" style="width: 14px; height: 14px;" />
        </button>
      )}

      <div className="vixt-code-card__viewport">
        <pre className="vixt-code-card__pre">
          <code className="vixt-code-card__code">{code}</code>
        </pre>
      </div>
    </div>
  );
};
