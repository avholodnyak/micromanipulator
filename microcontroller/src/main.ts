import StepperMotor from './StepperMotor';

global.motors = {
  x: new StepperMotor({
    pins: {
      enable: D29,
      step: D26,
      direction: D25,
    },
    microStep: {
      pins: {
        ms1: {
          pin: D28,
          enabled: false,
        },
        ms2: {
          pin: D27,
          enabled: true,
        },
      },
      multiplier: 1 / 64,
    },
    maxSpeed: 1500,
    maxStartSpeed: 500,
  }),
  y: new StepperMotor({
    pins: {
      enable: D18,
      step: D15,
      direction: D14,
    },
    microStep: {
      pins: {
        ms1: {
          pin: D17,
          enabled: false,
        },
        ms2: {
          pin: D16,
          enabled: true,
        },
      },
      multiplier: 1 / 64,
    },
    maxSpeed: 1500,
    maxStartSpeed: 500,
  }),
  z: new StepperMotor({
    pins: {
      enable: D31,
      step: D5,
      direction: D11,
    },
    microStep: {
      pins: {
        ms1: {
          pin: D3,
          enabled: false,
        },
        ms2: {
          pin: D4,
          enabled: true,
        },
      },
      multiplier: 1 / 64,
    },
    maxSpeed: 1500,
    maxStartSpeed: 500,
  }),
};
