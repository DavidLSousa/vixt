export * from './core/store';
export * from './core/dom';
export * from './core/events';
export * from './utils/security';
export * from './utils/validation';
export * from './utils/http';

// Modular Components
export * from './components/primitives';
export * from './components/layout';
export * from './components/presentation';
export * from './components/forms';
export * from './components/icons';
export * from './components/feedback';
export * from './components/navigation';
export * from './components/overlays';
export * from './components/data';

import { VNode } from './core/dom';

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
