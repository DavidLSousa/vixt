export type VNode = {
  tag: string | Function;
  props: Record<string, any>;
  children: any[];
};

export function h(
  tag: string | Function,
  props: Record<string, any> | null,
  ...children: any[]
): VNode {
  return {
    tag,
    props: props || {},
    children: children
      .flat()
      .filter((c) => c !== null && c !== undefined && c !== false),
  };
}

export function Fragment({ children }: { children?: any; key?: string | number; [key: string]: any }) {
  return children;
}

// Blacklist de atributos perigosos e protocolos de URL
const DANGEROUS_ATTRS = /^(on|formaction|poster|background|data|codebase)/i;
const DANGEROUS_PROTOCOLS = /^(javascript|data|vbscript):/i;

export function render(
  vnode: VNode | string | number | null | undefined | boolean,
  isSVG = false,
): Node {
  // 1. Handle primitives and empty values (including true/false)
  if (vnode === null || vnode === undefined || typeof vnode === "boolean") {
    return document.createTextNode("");
  }

  if (typeof vnode === "string" || typeof vnode === "number") {
    return document.createTextNode(String(vnode));
  }

  // Handle Arrays (Fragments)
  if (Array.isArray(vnode)) {
    const fragment = document.createDocumentFragment();
    vnode.forEach((child) => {
      fragment.appendChild(render(child, isSVG));
    });
    return fragment;
  }

  // At this point, TS might still be unsure, so we cast to VNode
  const node = vnode as VNode;

  // 2. Handle Functional Components
  if (typeof node.tag === "function") {
    return render(
      node.tag({ ...node.props, children: node.children }),
      isSVG,
    );
  }

  // 3. Handle Regular Elements
  const tagIsSVG = isSVG || node.tag === "svg";
  const element = tagIsSVG
    ? document.createElementNS("http://www.w3.org/2000/svg", node.tag as string)
    : document.createElement(node.tag as string);

  // Set attributes/props
  Object.entries(node.props || {}).forEach(([name, value]) => {
    if (name === "children") return;

    // SECURITY: Block dangerous attributes (on*, formaction, etc) if they are strings
    if (DANGEROUS_ATTRS.test(name) && typeof value !== 'function') {
      console.warn(`[Vixt Security] Blocked dangerous attribute: ${name}`);
      return;
    }

    if (name === "className") {
      element.setAttribute("class", String(value));
    } else if (name === "htmlFor") {
      element.setAttribute("for", String(value));
    } else if (name.startsWith("on")) {
      if (typeof value === "function") {
        const eventName = name.toLowerCase().substring(2);
        element.addEventListener(eventName, value as EventListener);
      }
    } else {
      // SECURITY: Sanitize URLs in href, src, etc
      const strValue = String(value);
      if ((name === 'href' || name === 'src' || name === 'action') && DANGEROUS_PROTOCOLS.test(strValue)) {
        console.warn(`[Vixt Security] Blocked dangerous URL protocol: ${strValue}`);
        element.setAttribute(name, '#blocked');
      } else {
        element.setAttribute(name, strValue);
      }
    }
  });

  // Render children
  node.children.forEach((child: any) => {
    element.appendChild(render(child, tagIsSVG));
  });

  return element;
}

export function mountApp(
  container: HTMLElement | null,
  component: () => VNode,
  store?: { subscribe: (fn: () => void) => void },
) {
  if (!container) return;

  const update = () => {
    // Preservar scroll para evitar o "pulo" no topo
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    container.innerHTML = "";
    const node = render(component());
    container.appendChild(node);

    // Restaurar scroll instantaneamente
    window.scrollTo(scrollX, scrollY);
  };

  if (store) {
    store.subscribe(update);
  }

  update();
}
