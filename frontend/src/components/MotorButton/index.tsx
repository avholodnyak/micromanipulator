import React, { ReactNode, useCallback } from 'react';
import { Button } from '@mui/material';

import useMotor, { Axis } from 'hooks/useMotor';

const MotorButton = ({
  axis,
  rotateClockwise = true,
  direction,
}: {
  axis: Axis;
  rotateClockwise?: boolean;
  direction: ReactNode;
}) => {
  const { connected, start, stop: stopRotation } = useMotor(axis);

  const startRotation = useCallback(() => {
    start({ clockwise: rotateClockwise });
  }, [rotateClockwise, start]);

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
