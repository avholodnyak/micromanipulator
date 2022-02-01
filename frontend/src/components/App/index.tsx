import React from 'react';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';

import useMcu from 'hooks/useMcu';
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
        <MotorButton axis="y" rotateClockwise={false} direction="up" />
      </Box>

      <ButtonGroup>
        <MotorButton axis="x" rotateClockwise={false} direction="left" />
        <MotorButton axis="x" rotateClockwise={true} direction="right" />
      </ButtonGroup>

      <Box my={2}>
        <MotorButton axis="y" rotateClockwise={true} direction="down" />
      </Box>
    </Cont>
  );
};

export default App;
