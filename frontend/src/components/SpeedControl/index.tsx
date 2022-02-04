import React from 'react';
import { Slider, Typography } from '@mui/material';

import useMcu from 'hooks/useMcu';

import { Cont } from './styled';
import useSpeedControl from './useSpeedControl';

export { default as useSpeedControl } from './useSpeedControl';

const SpeedControl = () => {
  const { speed, setSpeed } = useSpeedControl();
  const { connected } = useMcu();

  return (
    <Cont>
      <Typography gutterBottom>Speed</Typography>
      <Slider
        value={speed}
        onChange={(e, v) => {
          if (!Array.isArray(v)) {
            setSpeed(v);
          }
        }}
        min={5}
        max={1500}
        valueLabelDisplay="auto"
        aria-label="Speed"
        // Disable keyboard control
        // not to conflict with motors hotkeys
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        disabled={!connected}
      />
    </Cont>
  );
};

export default SpeedControl;
