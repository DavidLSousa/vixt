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

export function Fragment({ children }: { children: any }) {
  return children;
}

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

    if (name === "className") {
      element.setAttribute("class", String(value));
    } else if (name === "htmlFor") {
      element.setAttribute("for", String(value));
    } else if (name.startsWith("on") && typeof value === "function") {
      const eventName = name.toLowerCase().substring(2);
      element.addEventListener(eventName, value as EventListener);
    } else {
      element.setAttribute(name, String(value));
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
    container.innerHTML = "";
    const node = render(component());
    container.appendChild(node);
  };

  if (store) {
    store.subscribe(update);
  }

  update();
}
