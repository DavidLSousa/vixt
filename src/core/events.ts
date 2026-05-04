type EventHandler = (e: Event) => void;

const eventRegistry = new Map<string, EventHandler>();

export function registerEvent(id: string, handler: EventHandler) {
  eventRegistry.set(id, handler);
  return id;
}

export function setupEvents(container: HTMLElement) {
  const eventTypes = ['click', 'input', 'submit', 'change', 'blur', 'focus'];

  eventTypes.forEach((type) => {
    container.addEventListener(type, (e) => {
      const target = (e.target as HTMLElement).closest(`[data-on-${type}]`);
      if (target) {
        const handlerId = target.getAttribute(`data-on-${type}`);
        if (handlerId && eventRegistry.has(handlerId)) {
          eventRegistry.get(handlerId)!(e);
        }
      }
    });
  });
}

// Helper to generate a unique ID and register the handler
export function on(type: string, handler: EventHandler): string {
  const id = `evt-${Math.random().toString(36).substr(2, 9)}`;
  registerEvent(id, handler);
  return `data-on-${type}="${id}"`;
}
