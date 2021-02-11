import React, { useState } from 'react';
import {
  AppBar,
  Button,
  ButtonGroup,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';

import { NormalCalendarContainer } from './Selectors/NormalSelector/NormalCalendarContainer';
import { SpecificDatesContainer } from './Selectors/SpecificDatesSelector/SpecificDatesContainer';
import { WeekdaySelectorContainer } from './Selectors/WeekdaySelector/WeekdaySelectorContainer';

export const DateSelector = ({
  direction,
  closePopup,
}: {
  direction: '' | 'oneWay' | 'return';
  closePopup: () => void;
}) => {
  const [component, setComponent] = useState<string>('Normal');
  const classes = useStyles();

  const buttons = ['Normal', 'Weekdays', 'Advanced'];

  const renderSelector = () => {
    switch (component) {
      case 'Normal':
        return <NormalCalendarContainer direction={direction} />;
      case 'Advanced':
        return (
          <SpecificDatesContainer
            direction={direction}
            closePopup={closePopup}
          />
        );
      case 'Weekdays':
        return (
          <WeekdaySelectorContainer
            direction={direction}
            closePopup={closePopup}
          />
        );
    }
  };

  return (
    <div className={classes.dateSelectorContainer}>
      <div className={classes.navButtonContainer}>
        <ButtonGroup fullWidth={true} disableElevation={true}>
          {buttons.map((name) => {
            const selected = name === component;
            return (
              <Button
                className={
                  selected ? classes.navButtonSelected : classes.navButton
                }
                variant={selected ? 'contained' : 'outlined'}
                onClick={() => {
                  setComponent(name);
                }}
              >
                {name}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>

      <Paper>{renderSelector()}</Paper>
    </div>
  );
};

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  dateSelectorContainer: {
    width: '310px',
    minHeight: '305px',
    paddingTop: '0px',
  },
  navButton: {
    color: '#9933cc',
    border: '1px solid rgba(153, 51, 204, 0.50);',
  },
  navButtonSelected: {
    backgroundColor: '#9933cc',
    color: '#FFFFFF',
    boxShadow:
      '0px 3px 1px -2px rgba(153, 51, 204, 0.25),0px 2px 2px 0px rgba(153, 51, 204, 0.25),0px 1px 5px 0px rgba(153, 51, 204, 0.25);',
  },
}));
