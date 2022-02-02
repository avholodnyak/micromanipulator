import React from 'react';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';

import useMcu from 'hooks/useMcu';
import SpeedControl from 'components/SpeedControl';
import MotorButton from 'components/MotorButton';

import { Cont } from './styled';

const App = () => {
  const { connected, connect } = useMcu();

  return (
    <Cont>
      <Typography variant="h3">DIY micromanipulator app</Typography>

      <Box my={2}>
        <Button onClick={connect} variant="contained" disabled={connected}>
          Connect!
        </Button>
      </Box>

      <Box my={2}>
        <MotorButton
          axis="y"
          rotateClockwise={false}
          direction="up"
          hotkey="ArrowUp"
        />
      </Box>

      <ButtonGroup>
        <MotorButton
          axis="x"
          rotateClockwise={false}
          direction="left"
          hotkey="ArrowLeft"
        />
        <MotorButton
          axis="x"
          rotateClockwise={true}
          direction="right"
          hotkey="ArrowRight"
        />
      </ButtonGroup>

      <Box my={2}>
        <MotorButton
          axis="y"
          rotateClockwise={true}
          direction="down"
          hotkey="ArrowDown"
        />
      </Box>

      <Box my={4} mx={2} width={400} maxWidth="100%">
        <SpeedControl />
      </Box>
    </Cont>
  );
};

export default App;
