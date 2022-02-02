import React, { ReactNode, useCallback } from 'react';
import { Button } from '@mui/material';

import useMotor, { Axis } from 'hooks/useMotor';

import useHotkey from './useHotkey';

const MotorButton = ({
  axis,
  rotateClockwise = true,
  direction,
  hotkey,
}: {
  axis: Axis;
  rotateClockwise?: boolean;
  direction: ReactNode;
  hotkey?: string;
}) => {
  const { connected, start, stop: stopRotation } = useMotor(axis);

  const startRotation = useCallback(() => {
    start({ clockwise: rotateClockwise });
  }, [rotateClockwise, start]);

  useHotkey({ hotkey, onKeyDown: startRotation, onKeyUp: stopRotation });

  return (
    <Button
      onMouseDown={startRotation}
      onMouseUp={stopRotation}
      onTouchStart={(e) => {
        e.preventDefault();
        startRotation();
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        stopRotation();
      }}
      variant="contained"
      color="secondary"
      disabled={!connected}
    >
      Move {axis} axis {direction}
    </Button>
  );
};

export default MotorButton;
