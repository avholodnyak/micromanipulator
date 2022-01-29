import React, { useState } from 'react';
import uart from './espruino-uart';

import { Cont } from './styled';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';

const App = () => {
  const [connected, setConnected] = useState(uart.isConnected());

  return (
    <Cont>
      <Typography variant="h3">DIY micromanipulator app</Typography>

      <Box my={2}>
        <Button
          onClick={() => uart.connect(() => setConnected(true))}
          variant="contained"
          disabled={connected}
        >
          Connect!
        </Button>
      </Box>

      <ButtonGroup>
        <Button
          onClick={() =>
            uart.write('motors.x.moveTo(motors.x.getPosition() + 500, 1000);\n')
          }
          variant="contained"
          disabled={!connected}
        >
          Rotate x axis +
        </Button>

        <Button
          onClick={() =>
            uart.write('motors.x.moveTo(motors.x.getPosition() - 500, 1000);\n')
          }
          variant="contained"
          color="secondary"
          disabled={!connected}
        >
          Rotate x axis -
        </Button>
      </ButtonGroup>
    </Cont>
  );
};

export default App;
