import { useCallback } from 'react';
import useMcu from 'hooks/useMcu';

export type Axis = 'x' | 'y' | 'z' | 'r';

const useMotor = (axis: Axis) => {
  const { connected, sendCommand } = useMcu();

  const start = useCallback(
    (options: { speed?: number; clockwise?: boolean } = {}) => {
      sendCommand(`motors.${axis}.start(${JSON.stringify(options)})`);
    },
    [sendCommand, axis]
  );

  const stop = useCallback(() => {
    sendCommand(`motors.${axis}.stop()`);
  }, [sendCommand, axis]);

  return { connected, start, stop };
};

export default useMotor;
