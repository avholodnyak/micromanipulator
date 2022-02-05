type ConnectionEvent = 'open' | 'close' | 'data';

type Connection = {
  on: (event: ConnectionEvent, cb: () => void) => void;
};

declare const uart: {
  write: (command: string) => void;
  eval: (command: string, cb: (result: string) => void) => void;
  connect: (cb: (connection: Connection) => void) => void;
  isConnected: () => boolean;
};

export default uart;
