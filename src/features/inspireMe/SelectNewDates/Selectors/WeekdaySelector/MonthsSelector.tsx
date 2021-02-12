import { Button, makeStyles, Theme, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { MonthType } from './WeekdaySelectorContainer';

export const MonthSelector = ({
  handleMonthSelections,
  setCompleted,
}: {
  handleMonthSelections: (updatedSelections: MonthType[]) => void;
  setCompleted: (completed: boolean) => void;
}) => {
  const [months, setMonths] = useState<MonthType[]>(setInitialDatesState());
  const classes = useStyles();

  const toggleMonth = (name: string) => {
    setMonths(
      months.map((month) => {
        if (month.name === name) {
          return {
            ...month,
            selected: !month.selected,
          };
        }
        return month;
      })
    );
  };

  return (
    <>
      <div className={classes.titleContainer}>
        <Typography variant="overline">Select possible months</Typography>
      </div>
      <div className={classes.monthButtonContainer}>
        {months.map(({ name, selected }) => {
          const monthClass = clsx(classes.monthButton, {
            [classes.activeMonth]: selected,
          });
          return (
            <Button
              key={name}
              className={monthClass}
              variant={selected ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => toggleMonth(name)}
            >
              {name}
            </Button>
          );
        })}
      </div>
      <div className={classes.saveButtonContainer}>
        <Button
          onClick={() => {
            handleMonthSelections(months.filter((month) => month.selected));
            setCompleted(true);
          }}
          disabled={months.find((month) => month.selected) ? false : true}
        >
          Save Selection
        </Button>
      </div>
    </>
  );
};

const setInitialDatesState = (): MonthType[] => {
  const todaysDate = new Date(new Date());
  const todaysMonth = todaysDate.getMonth();
  const todaysYear = todaysDate.getFullYear();
  const nextYear = todaysYear + 1;

  const selectableMonths = [
    ...calendarMonths
      .slice(todaysMonth)
      .map((month) => `${month} ${todaysYear}`),
    ...calendarMonths
      .slice(0, todaysMonth)
      .map((month) => `${month} ${nextYear}`),
  ];

  const initialDatesState: MonthType[] = selectableMonths.map((name, idx) => {
    const monthNum =
      todaysMonth + idx + 1 <= 12
        ? todaysMonth + idx + 1
        : todaysMonth + idx + 1 - 12;
    const monthString = `${monthNum < 10 ? '0' : ''}${monthNum}`;
    return {
      name,
      month: monthString,
      year: `${todaysMonth + idx + 1 < 13 ? todaysYear : nextYear}`,
      selected: false,
    };
  });
  return initialDatesState;
};

const calendarMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    padding: '16px 32px 0px 32px',
  },
  monthButton: {
    marginLeft: '32px',
    marginRight: '32px',
    marginBottom: '12px',
    color: '#9933cc',
    border: '1px solid rgba(153, 51, 204, 0.50);',
  },
  activeMonth: {
    backgroundColor: '#9933cc',
    color: '#FFFFFF',
    boxShadow:
      '0px 3px 1px -2px rgba(153, 51, 204, 0.25),0px 2px 2px 0px rgba(153, 51, 204, 0.25),0px 1px 5px 0px rgba(153, 51, 204, 0.25);',
  },
  saveButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexBasis: 1,
    padding: '4px',
  },
}));
