type MotorPins = {
  enable: Pin;
  step: Pin;
  direction: Pin;
  halfStepMode: Pin;
};

type MotorConfig = {
  pins: MotorPins;
  maxSpeed: number;
  maxStartSpeed: number;
  halfStepMode?: boolean;
};

export class StepperMotor {
  protected config: MotorConfig;

  constructor(config: MotorConfig) {
    this.config = {
      ...config,
    };
    this.init();
  }

  protected init() {
    pinMode(this.config.pins.step, 'auto', true); // TODO
    this.config.pins.direction.write(true);
    this.stop();
    this.disable();
    // Use half step mode
    this.config.pins.halfStepMode.write(true);
  }

  enable() {
    this.config.pins.enable.write(false);
  }

  disable() {
    this.config.pins.enable.write(true);
  }

  start({ speed, reverse = false }: { speed?: number; reverse?: boolean }) {
    this.config.pins.direction.write(!reverse);

    const { maxStartSpeed } = this.config;
    analogWrite(this.config.pins.step, 0.5, {
      freq: speed ?? maxStartSpeed,
      // It seems like there's only 1 hardware PWM
      // and it's used for all pwm pins.
      // Use software PWM to allocate an individual PWM for each pin.
      forceSoft: true, // TODO
    });
  }

  stop = () => {
    analogWrite(this.config.pins.step, 0, {});
  };
}
