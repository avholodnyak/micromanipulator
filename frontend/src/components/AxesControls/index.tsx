import React from 'react';
import { Typography } from '@mui/material';
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  ArrowDropUp,
  ArrowDropDown,
} from '@mui/icons-material';

import MotorButton from 'components/MotorButton';

import { Cont, ZCont, XYCont, YBtnCont, XCont } from './styled';

const AxesControls = () => (
  <Cont>
    <ZCont>
      <MotorButton axis="z" rotateClockwise={true} Icon={ArrowDropUp} />
      <Typography color="#999">Z</Typography>
      <MotorButton axis="z" rotateClockwise={false} Icon={ArrowDropDown} />
    </ZCont>

    <XYCont>
      <YBtnCont>
        <MotorButton
          axis="y"
          rotateClockwise={false}
          hotkey="ArrowUp"
          Icon={KeyboardArrowUp}
        />
      </YBtnCont>

      <XCont>
        <MotorButton
          axis="x"
          rotateClockwise={false}
          hotkey="ArrowLeft"
          Icon={KeyboardArrowLeft}
        />
        <MotorButton
          axis="x"
          rotateClockwise={true}
          hotkey="ArrowRight"
          Icon={KeyboardArrowRight}
        />
      </XCont>

      <YBtnCont>
        <YBtnCont>
          <MotorButton
            axis="y"
            rotateClockwise={true}
            hotkey="ArrowDown"
            Icon={KeyboardArrowDown}
          />
        </YBtnCont>
      </YBtnCont>
    </XYCont>
  </Cont>
);

export default AxesControls;
