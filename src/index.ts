export * from './core/store';
export * from './core/dom';
export * from './core/events';
export * from './utils/security';
export * from './utils/validation';
export * from './utils/http';
export * from './components/primitives.tsx';
export * from './components/layout.tsx';
export * from './components/presentation.tsx';
export * from './components/forms.tsx';
export * from './components/icons.tsx';

import { VNode } from './core/dom';

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
