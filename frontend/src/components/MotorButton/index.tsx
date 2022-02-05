import React, { useCallback } from 'react';
import { IconButton } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

import useMotor, { Axis } from 'hooks/useMotor';
import { useSpeedControl } from 'components/SpeedControl';

import useHotkey from './useHotkey';

const MotorButton = ({
  axis,
  rotateClockwise = true,
  hotkey,
  Icon,
}: {
  axis: Axis;
  rotateClockwise?: boolean;
  hotkey?: string;
  Icon: SvgIconComponent;
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
      sx={{ fontSize: '3rem' }}
      color="primary"
    >
      <Icon fontSize="inherit" />
    </IconButton>
  );
};

export default MotorButton;
