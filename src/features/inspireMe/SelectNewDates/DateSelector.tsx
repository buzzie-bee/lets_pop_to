import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  ButtonGroup,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';

import { NormalCalendarContainer } from './Selectors/NormalSelector/NormalCalendarContainer';
import { SpecificDatesContainer } from './Selectors/SpecificDatesSelector/SpecificDatesContainer';
import { WeekdaySelectorContainer } from './Selectors/WeekdaySelector/WeekdaySelectorContainer';
import { setSelectorType } from '../slice/inspireMeSlice';

import { RootState } from '../../../redux/store';
import { InspireMeStateType, SelectorType } from '../../../type';

export const DateSelector = ({
  tripType,
  closePopup,
}: {
  tripType: '' | 'oneWay' | 'return';
  closePopup: () => void;
}) => {
  const { selectorType }: InspireMeStateType = useSelector(
    (state: RootState) => state.inspireMe
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  const buttons: SelectorType[] = ['Normal', 'Advanced', 'Weekdays'];

  const setComponent = (
    selectorType: 'Normal' | 'Advanced' | 'Weekdays'
  ): void => {
    dispatch(setSelectorType(selectorType));
  };

  const renderSelector = () => {
    switch (selectorType) {
      case 'Normal':
        return (
          <NormalCalendarContainer
            tripType={tripType}
            closePopup={closePopup}
          />
        );
      case 'Advanced':
        return (
          <SpecificDatesContainer tripType={tripType} closePopup={closePopup} />
        );
      case 'Weekdays':
        return (
          <WeekdaySelectorContainer
            tripType={tripType}
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
            const selected = name === selectorType;
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
