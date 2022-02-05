import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import useMcu from 'hooks/useMcu';
import AxesControls from 'components/AxesControls';
import SpeedControl from 'components/SpeedControl';

import { Cont } from './styled';

const App = () => {
  const { connected, connect } = useMcu();

  return (
    <Cont>
      <Typography variant="h4">DIY Micromanipulator</Typography>

      <Box my={4}>
        <Button onClick={connect} variant="contained" disabled={connected}>
          Connect
        </Button>
      </Box>

      <Box width="100%" my={12}>
        <AxesControls />
      </Box>

      <Box width="100%">
        <SpeedControl />
      </Box>
    </Cont>
  );
};

export default App;
