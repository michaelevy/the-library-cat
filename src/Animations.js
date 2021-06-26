import { useState, useEffect } from "react";
/**
 * Animate component on mount
 * @param component the component to animate
 * @param name component key (optional)
 * @param initial initial styles of the component
 * @param final final styles of the component
 */
export function Animate({ component, name, initial, final }) {
  const [styles, setStyles] = useState(initial);

  useEffect(() => {
    setTimeout(() => setStyles(final), 10);
    return setStyles(initial);
  }, [initial, final]);

  return (
    <div key={name} style={styles}>
      {component}
    </div>
  );
}
