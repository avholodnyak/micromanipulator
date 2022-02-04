import useGlobalState from '@vighnesh153/use-global-state';

const useSpeedControl = () => {
  const [speed, setSpeed] = useGlobalState(
    'components.SpeedControl.useSpeedControl.speed',
    500
  );

  return { speed, setSpeed: setSpeed };
};

export default useSpeedControl;
