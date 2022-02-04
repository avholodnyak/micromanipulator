import isNil from 'is-nil';

import objectValues from './helpers/objectValues';

type MotorPins = {
  enable: Pin;
  step: Pin;
  direction: Pin;
};

type MicroStepPinConfig = {
  pin: Pin;
  enabled: boolean;
};

type MicroStepConfig = {
  pins: Partial<Record<'m1' | 'm2', MicroStepPinConfig>>;
  multiplier: number;
};

type MotorConfig = {
  pins: MotorPins;
  microStep: MicroStepConfig;
  maxSpeed: number;
  maxStartSpeed: number;
};

export default class StepperMotor {
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

    this.initMicroStep();
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

  protected initMicroStep() {
    objectValues(this.config.microStep.pins).forEach(({ pin, enabled }) => {
      pin.write(enabled);
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

  protected setSpeed(speed: number) {
    analogWrite(this.config.pins.step, 0.5, {
      freq: speed / this.config.microStep.multiplier,
    });
  }

  start(options: { speed?: number; clockwise?: boolean } = {}) {
    // In case if previous acceleration hasn't been finished yet
    this.stopAcceleration();

    this.setDirection(options.clockwise ?? true);

    const { maxStartSpeed } = this.config;
    const speed = options.speed ?? maxStartSpeed;

    // Starting the motor with speed > maxStartSpeed will get it stuck
    const startSpeed = Math.min(speed, maxStartSpeed);
    this.setSpeed(startSpeed);
    this.enable();

    if (speed > startSpeed) {
      this.accelerate(startSpeed, Math.min(speed, this.config.maxSpeed));
    }
  }

  protected accelerationTimeId?: number;

  protected accelerate(from: number, to: number) {
    // Speed delta in steps per second
    const speedDelta = 50;
    // Time delta in ms
    const timeDelta = 10;

    this.accelerationTimeId = setTimeout(() => {
      const nextSpeed = from + speedDelta;
      this.setSpeed(nextSpeed);

      if (nextSpeed < to) {
        this.accelerate(nextSpeed, to);
      }
    }, timeDelta);
  }

  protected stopAcceleration() {
    if (isNil(this.accelerationTimeId)) return;

    clearTimeout(this.accelerationTimeId);
    this.accelerationTimeId = undefined;
  }

  stop = () => {
    // Just disable the motor and don't reset the pin
    // not to lose the allocated PWM timer
    this.disable();
    this.stopAcceleration();
  };
}
