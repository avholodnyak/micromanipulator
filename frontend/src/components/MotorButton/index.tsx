import React, { ReactNode, useCallback } from 'react';
import { IconButton } from '@mui/material';

import useMotor, { Axis } from 'hooks/useMotor';
import { useSpeedControl } from 'components/SpeedControl';

import useHotkey from './useHotkey';

const MotorButton = ({
  axis,
  rotateClockwise = true,
  hotkey,
  icon,
}: {
  axis: Axis;
  rotateClockwise?: boolean;
  hotkey?: string;
  icon: ReactNode;
}) => {
  const { connected, start, stop: stopRotation } = useMotor(axis);
  const { speed } = useSpeedControl();

  const startRotation = useCallback(() => {
    start({ clockwise: rotateClockwise, speed });
  }, [start, rotateClockwise, speed]);

  useHotkey({ hotkey, onKeyDown: startRotation, onKeyUp: stopRotation });

  return (
    <IconButton
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
      disabled={!connected}
      size="large"
      color="primary"
    >
      {icon}
    </IconButton>
  );
};

export default MotorButton;
