import StepperMotor from './StepperMotor';

const pattern = [
  0b0001, 0b0011,
  0b0010, 0b0110,
  0b0100, 0b1100,
  0b1000, 0b1001,
];

global.motors = {
  x: new StepperMotor({
    pins: [D18, D19, D20, D22],
    pattern: pattern,
  })
};
