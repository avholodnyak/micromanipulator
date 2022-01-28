declare const uart: {
  write: (command: string) => void;
  eval: (command: string, cb: (result: string) => void) => void;
  connect: (cb: () => void) => void;
  isConnected: () => boolean;
};

export default uart;