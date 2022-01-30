import { StepperMotor } from './StepperMotor';

global.motors = {
  x: new StepperMotor({
    pins: {
      enable: D16,
      step: D15,
      direction: D14,
      halfStepMode: D17,
    },
    maxSpeed: 1000,
    maxStartSpeed: 500,
  }),
  y: new StepperMotor({
    pins: {
      enable: D22,
      step: D20,
      direction: D19,
      halfStepMode: D17,
    },
    maxSpeed: 1000,
    maxStartSpeed: 500,
  }),
};
