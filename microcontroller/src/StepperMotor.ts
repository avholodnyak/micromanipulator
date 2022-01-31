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
    // Disable the motor to avoid overheating
    this.disable();

    // Initialize step pin
    pinMode(this.config.pins.step, 'auto', true);
    this.config.pins.step.write(false);

    // Initialize direction pin
    this.config.pins.direction.write(true);

    // Use half step mode
    this.config.pins.halfStepMode.write(true);
  }

  protected enable() {
    this.config.pins.enable.write(false);
  }

  protected disable() {
    this.config.pins.enable.write(true);
  }

  start({ speed, reverse = false }: { speed?: number; reverse?: boolean }) {
    this.enable();
    this.config.pins.direction.write(!reverse);

    const { maxStartSpeed } = this.config;
    analogWrite(this.config.pins.step, 0.5, {
      freq: speed ?? maxStartSpeed,
      // It seems like there's only 1 hardware PWM
      // and it's used for all PWM pins.
      // Use software PWM to allocate an individual PWM for each motor.
      forceSoft: true,
    });
  }

  stop = () => {
    this.config.pins.step.write(false);
    // Disable the motor to avoid overheating
    this.disable();
  };
}
