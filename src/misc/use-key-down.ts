import { useEffect } from "react";

export function useKeyDown(
  f: () => void,
  keyCodes: string[],
  dependencies: React.DependencyList | undefined = undefined
): void {
  const handler = ({ code }: KeyboardEvent) => {
    if (keyCodes.includes(code)) {
      f();
    }
  };

  useEffect(
    () => {
      window.addEventListener("keydown", handler);

      // So that the event listener is only there when the component is rendered.
      return () => {
        window.removeEventListener("keydown", handler);
      };
    },
    dependencies === undefined ? [handler] : [handler, ...dependencies]
  );
}
