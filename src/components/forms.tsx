import { h } from '../core/dom';

export const InputField = ({ 
  label, 
  type = 'text', 
  value = '', 
  placeholder = '', 
  onInput 
}: { 
  label?: string; 
  type?: string; 
  value?: string; 
  placeholder?: string;
  onInput?: (val: string) => void;
}) => {
  const handleInput = (e: Event) => {
    if (onInput) onInput((e.target as HTMLInputElement).value);
  };

  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <input 
        type={type} 
        value={value} 
        placeholder={placeholder} 
        className="input-field"
        onInput={handleInput}
      />
    </div>
  );
};

export const FormGroup = ({ children }: { children?: any }) => {
  return <div className="form-group">{children}</div>;
};
