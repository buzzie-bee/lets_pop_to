import {
  Button,
  makeStyles,
  Slider,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import clsx from 'clsx';
import { isNumeric } from '../../../../../helpers/isNumeric';
import { InspireMeStateType, WeekdayType } from '../../../../../type';
import { RootState } from '../../../../../redux/store';
import { useSelector } from 'react-redux';

export const WeekdaySelector = ({
  tripType,
  direction,
  setComponent,
  handleDaySelections,
  handleDurationRange,
}: {
  tripType: '' | 'oneWay' | 'return';
  direction: 'outbound' | 'inbound';
  setComponent: (component: 'outbound' | 'inbound' | 'months') => void;
  handleDaySelections: (updatedSelections: WeekdayType[]) => void;
  handleDurationRange: (durationRange: number[]) => void;
}) => {
  const {
    weekdaySelections,
    durationRange: initialDurationRange,
  }: InspireMeStateType = useSelector((state: RootState) => state.inspireMe);

  const initialDaysState = weekdaySelections[direction];

  const [days, setDays] = useState<WeekdayType[]>(initialDaysState);
  const [durationRange, setDurationRange] = useState<number[]>(
    initialDurationRange
  );
  const [maxDuration, setMaxDuration] = useState<number>(20);
  const [durationTimeout, setDurationTimeout] = useState<boolean>(false);

  const classes = useStyles();

  const toggleDay = (
    day:
      | 'Monday'
      | 'Tuesday'
      | 'Wednesday'
      | 'Thursday'
      | 'Friday'
      | 'Saturday'
      | 'Sunday'
  ): void => {
    if (!day) {
      return;
    }
    setDays((days) =>
      days.map((dayState) => {
        if (dayState.weekday === day) {
          return {
            weekday: dayState.weekday,
            selected: !dayState.selected,
          };
        }
        return dayState;
      })
    );
  };

  const handleDurationChange = (event: any, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      if (typeof newValue[1] === 'number') {
        if (newValue[1] >= maxDuration) {
          if (!durationTimeout) {
            setDurationTimeout(true);
            setMaxDuration(maxDuration + 20);
            setTimeout(() => {
              setDurationTimeout(false);
            }, 1000);
          }
        }
      }
    }
    setDurationRange(newValue as number[]);
  };

  const handleTextFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value;
    const fieldName = e.target.name;
    const [minVal, maxVal] = durationRange;

    if (isNumeric(inputValue)) {
      const newValueInt = parseInt(inputValue);
      switch (fieldName) {
        case 'minDuration':
          setDurationRange([newValueInt, maxVal]);
          break;
        case 'maxDuration':
          setDurationRange([minVal, newValueInt]);
          break;
        default:
          return;
      }
    } else if (inputValue === '') {
      switch (fieldName) {
        case 'minDuration':
          setDurationRange([0, durationRange[1]]);
          break;
        case 'maxDuration':
          setDurationRange([durationRange[0], durationRange[0]]);
          break;
        default:
          return;
      }
    }
  };

  return (
    <div>
      <div className={classes.titleContainer}>
        <Typography variant="overline">
          {'Select possible departing days'}
        </Typography>
      </div>
      <div className={classes.dayButtonContainer}>
        {days.map((day) => {
          const { weekday, selected } = day;
          const dayClass = clsx(classes.dayButton, {
            [classes.activeDay]: selected,
          });
          return (
            <Button
              key={weekday}
              className={dayClass}
              variant={selected ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => toggleDay(weekday)}
            >
              {weekday}
            </Button>
          );
        })}
      </div>
      {tripType === 'return' && direction === 'inbound' && (
        <div className={classes.tripLengthContainer}>
          <Typography variant="overline">Set trip duration (days)</Typography>
          <div className={classes.sliderContainer}>
            <Slider
              value={durationRange}
              onChange={handleDurationChange}
              max={maxDuration}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
            />
          </div>
          <div className={classes.tripLengthRow}>
            <div className={classes.textField}>
              <TextField
                label="Minimum"
                name="minDuration"
                variant="outlined"
                onChange={handleTextFieldChange}
                value={durationRange[0]}
              />
            </div>
            <div className={classes.textField}>
              <TextField
                label="Maximum"
                name="maxDuration"
                variant="outlined"
                onChange={handleTextFieldChange}
                value={durationRange[1]}
              />
            </div>
          </div>
        </div>
      )}
      <div className={classes.nextButtonContainer}>
        <Button
          onClick={() => {
            setComponent(
              tripType === 'return' && direction === 'outbound'
                ? 'inbound'
                : 'months'
            );
            handleDaySelections(days);
            if (direction === 'inbound') {
              handleDurationRange(durationRange);
            }
          }}
          disabled={days.find((day) => day.selected) ? false : true}
        >
          {tripType === 'return' && direction === 'outbound'
            ? 'Set Return Weekdays'
            : 'Set Possible Months'}
        </Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    padding: '16px 32px 0px 32px',
  },
  dayButton: {
    marginLeft: '32px',
    marginRight: '32px',
    marginBottom: '12px',
    color: '#9933cc',
    border: '1px solid rgba(153, 51, 204, 0.50);',
  },
  activeDay: {
    backgroundColor: '#9933cc',
    color: '#FFFFFF',
    boxShadow:
      '0px 3px 1px -2px rgba(153, 51, 204, 0.25),0px 2px 2px 0px rgba(153, 51, 204, 0.25),0px 1px 5px 0px rgba(153, 51, 204, 0.25);',
  },
  nextButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexBasis: 1,
    padding: '4px',
  },
  tripLengthContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tripLengthRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexBasis: 1,
    width: '85%',
  },
  sliderContainer: {
    width: '80%',
  },
  textField: {
    width: '120px',
  },
}));
