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

  protected static motorsCount = 0;

  protected motorIndex: number;

  constructor(config: MotorConfig) {
    this.config = {
      ...config,
    };

    this.motorIndex = StepperMotor.motorsCount;
    StepperMotor.motorsCount += 1;

    this.init();
  }

  protected init() {
    // Disable the motor to avoid overheating
    this.disable();

    this.allocatePWMTimer();
    this.setDirection(true);

    // Use half step mode
    this.config.pins.halfStepMode.write(true);
  }

  /**
   * Unique frequencies used to allocate unique PWM hardware timers.
   * 10 frequencies should be enough as there are no MCUs with 10+ timers.
   */
  protected static uniqueFrequencies = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29].map(
    (x) => x * 1000
  );

  /**
   * Espruino uses 1 PWM hardware timer for all pins with the same frequency.
   * So when 1 pin is disabled (or its frequency is updated),
   * the others (with the same frequency) will be disabled (or updated) as well.
   * To avoid that, allocate a unique timer for each motor by using a unique frequency value.
   */
  protected allocatePWMTimer() {
    const { step } = this.config.pins;
    pinMode(step, 'auto', true);
    analogWrite(step, 0, {
      freq: StepperMotor.uniqueFrequencies[this.motorIndex],
    });
  }

  protected enable() {
    this.config.pins.enable.write(false);
  }

  protected disable() {
    this.config.pins.enable.write(true);
  }

  protected setDirection(clockwise: boolean) {
    this.config.pins.direction.write(clockwise);
  }

  start(options: { speed?: number; clockwise?: boolean } = {}) {
    this.setDirection(options.clockwise ?? true);

    const { maxStartSpeed } = this.config;
    analogWrite(this.config.pins.step, 0.5, {
      freq: options.speed ?? maxStartSpeed,
    });

    this.enable();
  }

  stop = () => {
    // Just disable the motor and don't reset the pin
    // not to lose the allocated PWM timer
    this.disable();
  };
}
