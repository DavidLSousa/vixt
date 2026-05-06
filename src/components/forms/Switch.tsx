/** @jsx h */
import { h } from '../../core/dom';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  style?: string | any;
  [key: string]: any;
}

export const Switch = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
  style = '',
  ...rest
}: SwitchProps) => {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div 
      className={`vixt-switch-container ${disabled ? 'vixt-switch--disabled' : ''} ${className}`} 
      style={style}
      {...rest}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`vixt-switch ${checked ? 'vixt-switch--checked' : ''}`}
        onClick={handleClick}
        disabled={disabled}
      >
        <span className="vixt-switch__thumb" />
      </button>
      {label && <span className="vixt-switch__label" onClick={handleClick}>{label}</span>}
    </div>
  );
};
