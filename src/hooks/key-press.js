import { useEffect, useState } from "preact/compat";

export function useKeyPress(
  targetKey,
  onPressDown = () => {},
  onPressUp = () => {}
) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    // If pressed key is our target key then set to true
    const downHandler = ({ key, keyCode, which }) => {
      let keycode;
      if (window.event) {
        keycode = keyCode;
      } else if (which) {
        keycode = which;
      }

      if (key === targetKey || keycode === targetKey) {
        setKeyPressed(true);
        onPressDown();
      }
    };

    // If released key is our target key then set to false
    const upHandler = ({ key, keyCode, which }) => {
      let keycode;
      if (window.event) {
        keycode = keyCode;
      } else if (which) {
        keycode = which;
      }

      if (key === targetKey || keycode === targetKey) {
        setKeyPressed(false);
        onPressUp();
      }
    };

    // Add event listeners
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
}
