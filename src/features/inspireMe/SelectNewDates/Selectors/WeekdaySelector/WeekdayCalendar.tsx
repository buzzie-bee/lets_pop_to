import { Button, makeStyles, Theme, Typography } from '@material-ui/core';
import { Day } from '@material-ui/pickers';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

interface WeekdayType {
  weekday:
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday';
  selected: boolean;
}

export const WeekdayCalendar = ({
  direction,
  closePopup,
}: {
  direction: '' | 'oneWay' | 'return';
  closePopup: () => void;
}) => {
  const [days, setDays] = useState<WeekdayType[]>([
    {
      weekday: 'Monday',
      selected: false,
    },
    {
      weekday: 'Tuesday',
      selected: false,
    },
    {
      weekday: 'Wednesday',
      selected: false,
    },
    {
      weekday: 'Thursday',
      selected: false,
    },
    {
      weekday: 'Friday',
      selected: false,
    },
    {
      weekday: 'Saturday',
      selected: false,
    },
    {
      weekday: 'Sunday',
      selected: false,
    },
  ]);

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

  useEffect(() => {
    console.log(days);
  }, [days]);

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
      <div className={classes.nextButtonContainer}>
        {direction === 'return' && <Button>Next</Button>}
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
    padding: '16px 32px 8px 32px',
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
}));
