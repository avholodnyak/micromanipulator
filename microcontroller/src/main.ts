import StepperMotor from './StepperMotor';

global.motors = {
  x: new StepperMotor({
    pins: {
      enable: D16,
      step: D15,
      direction: D14,
    },
    microStep: {
      pins: {
        m1: {
          pin: D17,
          enabled: true,
        },
      },
      multiplier: 1 / 2,
    },
    maxSpeed: 1500,
    maxStartSpeed: 500,
  }),
  y: new StepperMotor({
    pins: {
      enable: D22,
      step: D20,
      direction: D19,
    },
    microStep: {
      pins: {
        m1: {
          pin: D17,
          enabled: true,
        },
      },
      multiplier: 1 / 2,
    },
    maxSpeed: 1500,
    maxStartSpeed: 500,
  }),
};
