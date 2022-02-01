import React from 'react';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';

import useMcu from 'hooks/useMcu';

import { Cont } from './styled';
import useMotor from 'hooks/useMotor';

const App = () => {
  const { connected, connect } = useMcu();
  const motorX = useMotor('x');

  return (
    <Cont>
      <Typography variant="h3">DIY micromanipulator app</Typography>

      <Box my={2}>
        <Button onClick={connect} variant="contained" disabled={connected}>
          Connect!
        </Button>
      </Box>

      <ButtonGroup>
        <Button
          onMouseDown={() => motorX.start({ clockwise: false })}
          onMouseUp={() => motorX.stop()}
          variant="contained"
          color="secondary"
          disabled={!motorX.connected}
        >
          Rotate x axis -
        </Button>

        <Button
          onMouseDown={() => motorX.start({ clockwise: true })}
          onMouseUp={() => motorX.stop()}
          variant="contained"
          disabled={!motorX.connected}
        >
          Rotate x axis +
        </Button>
      </ButtonGroup>
    </Cont>
  );
};

export default App;
