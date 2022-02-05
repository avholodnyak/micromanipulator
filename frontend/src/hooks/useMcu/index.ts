import { useCallback } from 'react';
import useGlobalState from '@vighnesh153/use-global-state';

import uart from './espruino-uart';

const useMcu = () => {
  const [connected, setConnected] = useGlobalState(
    'hooks.useMcu.connected',
    uart.isConnected()
  );

  const connect = useCallback(() => {
    uart.connect((connection) => {
      setConnected(true);

      connection.on('close', () => {
        setConnected(false);
      });
    });
  }, [setConnected]);

  const sendCommand = useCallback((command: string) => {
    uart.write(`${command}\n`);
  }, []);

  return {
    connected,
    connect,
    sendCommand,
  };
};

export default useMcu;
