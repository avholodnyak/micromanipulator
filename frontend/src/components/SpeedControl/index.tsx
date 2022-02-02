import React from 'react';
import { Slider, Typography } from '@mui/material';

import { Cont } from './styled';
import useSpeedControl from './useSpeedControl';

export { default as useSpeedControl } from './useSpeedControl';

const SpeedControl = () => {
  const { speed, setSpeed } = useSpeedControl();

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
        min={10}
        max={3000}
        valueLabelDisplay="auto"
        aria-label="Speed"
      />
    </Cont>
  );
};

export default SpeedControl;
