export type ValidationRule = (value: any) => string | null;

export const rules = {
  required: (msg = 'Required field'): ValidationRule => (val) => !val ? msg : null,
  email: (msg = 'Invalid email'): ValidationRule => (val) => 
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? msg : null,
  minLength: (min: number, msg?: string): ValidationRule => (val) => 
    val.length < min ? (msg || `Minimum ${min} characters`) : null,
};

export function validate(value: any, rulesList: ValidationRule[]): string[] {
  return rulesList
    .map(rule => rule(value))
    .filter((err): err is string => err !== null);
}
