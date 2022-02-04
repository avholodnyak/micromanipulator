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
      <Typography variant="h3">micromanipulator app</Typography>

      <Box my={2}>
        <Button onClick={connect} variant="contained" disabled={connected}>
          Connect!
        </Button>
      </Box>

      <Box width="100%" my={10}>
        <AxesControls />
      </Box>

      <Box width="100%">
        <SpeedControl />
      </Box>
    </Cont>
  );
};

export default App;
