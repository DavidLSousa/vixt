type Listener = () => void;

export function createStore<T extends object>(initialState: T) {
  const listeners = new Set<Listener>();

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const notify = () => {
    listeners.forEach((listener) => listener());
  };

  const handler: ProxyHandler<T> = {
    set(target, prop, value) {
      if (Reflect.get(target, prop) === value) return true;
      const result = Reflect.set(target, prop, value);
      notify();
      return result;
    },
    // For nested objects, we would need a recursive proxy.
    // For a micro-framework, let's keep it simple or implement shallow reactivity first.
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      if (typeof value === "object" && value !== null) {
        return new Proxy(value as any, handler as any);
      }
      return value;
    },
  };

  const state = new Proxy(initialState, handler);

  return {
    state,
    subscribe,
  };
}
