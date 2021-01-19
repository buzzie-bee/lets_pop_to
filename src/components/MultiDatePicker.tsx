import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DatePicker } from '@material-ui/pickers';
import { IconButton, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  dayWrapper: {
    position: 'relative',
  },
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: '0 2px',
    color: 'inherit',
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled,
  },
  highlightNonCurrentMonthDay: {
    color: '#676767',
  },
  highlight: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: '25%',
    margin: '0.5px',
  },
}));

interface MultiDatePickerProps {
  selectedDates: Date[];
  updateSelectedDates: Dispatch<SetStateAction<Date[]>>;
}

const MultiDatePicker: React.FC<MultiDatePickerProps> = ({
  selectedDates,
  updateSelectedDates,
}) => {
  const [selectedDate, handleChangeDate] = useState<Date | null>(null);

  const classes = useStyles();

  const handleChange = (newDate: Date | null) => {
    if (!newDate) {
      return;
    }
    const newDateNormalised = new Date(newDate.toDateString());
    handleChangeDate(newDateNormalised);
    if (
      selectedDates.find(
        (date) => date.getTime() === newDateNormalised.getTime()
      )
    ) {
      updateSelectedDates((dates) =>
        dates.filter((date) => date.getTime() !== newDateNormalised.getTime())
      );
    } else {
      updateSelectedDates((dates) => [...dates, newDateNormalised]);
    }
  };

  const renderDay = (
    date: Date | null,
    _selectedDate: Date | null,
    dayInCurrentMonth: boolean
  ): JSX.Element => {
    // Had to make this check toDateString values as new Date put in a random timestamp that the date picker didn't add
    const dayIsSelected: boolean = selectedDates.find((day) => {
      return day.toDateString() === date?.toDateString();
    })
      ? true
      : false;

    // Had to do this stupid code to get around ts
    // kicking off because date is possibly null.
    // Why material possible uses a null date idk, stupid
    const notNullDate = date ? date : new Date(1900);
    const currentDateOnly = new Date(new Date().toDateString());
    const beforeTodayDay: boolean = currentDateOnly > notNullDate;

    const dayClassName = clsx(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth || beforeTodayDay,
      [classes.highlightNonCurrentMonthDay]:
        !dayInCurrentMonth && dayIsSelected,
    });

    return (
      <div className={dayIsSelected ? classes.highlight : classes.dayWrapper}>
        <IconButton className={dayClassName}>
          <span>{date?.getDate()}</span>
        </IconButton>
      </div>
    );
  };

  useEffect(() => {
    console.log(selectedDates);
  }, [selectedDates]);

  return (
    <DatePicker
      orientation="landscape"
      variant="static"
      disableToolbar={true}
      disablePast={true}
      openTo="date"
      value={selectedDate}
      views={['month', 'year', 'date']}
      onChange={handleChange}
      renderDay={renderDay}
    />
  );
};

export default MultiDatePicker;
