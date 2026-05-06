/** @jsx h */
import { h } from '../../core/dom';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  style?: string | any;
  [key: string]: any;
}

export const Checkbox = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
  style = '',
  ...rest
}: CheckboxProps) => {
  const handleChange = (e: any) => {
    if (!disabled) {
      onChange(e.target.checked);
    }
  };

  return (
    <label className={`vixt-checkbox-container ${disabled ? 'vixt-checkbox--disabled' : ''} ${className}`} style={style}>
      <div className="vixt-checkbox-wrapper">
        <input
          type="checkbox"
          className="vixt-checkbox__input"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          {...rest}
        />
        <div className={`vixt-checkbox__box ${checked ? 'vixt-checkbox__box--checked' : ''}`}>
          {checked && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </div>
      </div>
      {label && <span className="vixt-checkbox__label">{label}</span>}
    </label>
  );
};
