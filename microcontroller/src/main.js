const StepperMotor = require('StepperMotor');

const pattern = [
  0b0001, 0b0011,
  0b0010, 0b0110,
  0b0100, 0b1100,
  0b1000, 0b1001,
];

const motors = {
  x: new StepperMotor({
    pins: [A0, A1, A2, A3],
    pattern: pattern,
  })
};
