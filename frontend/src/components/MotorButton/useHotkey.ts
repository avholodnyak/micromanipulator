import { useEffect } from 'react';
import { isNil } from 'ramda';

const useHotkey = ({
  hotkey,
  onKeyDown,
  onKeyUp,
}: {
  hotkey?: string;
  onKeyDown: () => void;
  onKeyUp: () => void;
}) =>
  useEffect(() => {
    if (isNil(hotkey)) return;

    let pressed = false;

    const keyDownHandler = (e: KeyboardEvent) => {
      if (pressed) return;

      if (e.key === hotkey) {
        pressed = true;
        onKeyDown();
      }
    };
    window.addEventListener('keydown', keyDownHandler);

    const keyUpHandler = (e: KeyboardEvent) => {
      if (e.key === hotkey) {
        pressed = false;
        onKeyUp();
      }
    };
    window.addEventListener('keyup', keyUpHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, [hotkey, onKeyDown, onKeyUp]);
export default useHotkey;
