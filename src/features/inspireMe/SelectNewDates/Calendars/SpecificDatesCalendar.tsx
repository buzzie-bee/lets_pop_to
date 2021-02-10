import React, { useEffect, useState } from 'react';
import { IconButton, makeStyles, Theme } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { DateType } from '../../../../type';
import clsx from 'clsx';

export const SpecificDatesCalendar = ({
  direction,
}: {
  direction: '' | 'oneWay' | 'return';
}) => {
  const [dates, setDates] = useState<DateType[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [returnMode, setReturnMode] = useState<boolean>(false);

  const classes = useStyles();

  const handleChange = (newDate: Date | null) => {
    if (!newDate) {
      return;
    }

    const newDateNormalised = new Date(newDate.toDateString());
    const newDateString = `${newDateNormalised.toISOString().substr(0, 10)}`;

    setSelectedDate(newDateNormalised);

    if (!returnMode) {
      if (dates.find((date) => date.outbound === newDateString)) {
        setDates((dates) =>
          dates.filter((date) => date.outbound !== newDateString)
        );
      } else {
        setDates((dates) => [
          ...dates,
          { outbound: newDateString, inbound: '' },
        ]);
      }
    }
  };

  useEffect(() => {
    console.log(dates);
  }, [dates]);

  const renderDay = (
    date: Date | null,
    _selectedDate: Date | null,
    dayInCurrentMonth: boolean
  ): JSX.Element => {
    const nonNullDate = date ? date : new Date(1900);
    const dateTime = nonNullDate.getTime();
    const dateNormalised = new Date(nonNullDate.toDateString());
    const dateString = `${dateNormalised.toISOString().substr(0, 10)}`;

    const todayDate = new Date(new Date().toDateString());
    const todayTime = todayDate.getTime();

    const isInPast = dateTime ? dateTime < todayTime : false;
    const isSelected = dates.find((date) => date.outbound === dateString)
      ?.outbound
      ? true
      : false;

    const wrapperClassName = clsx(classes.dayWrapper, {
      [classes.highlight]: isSelected,
    });

    const dayClassName = clsx(classes.day, classes.dateElement, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth || isInPast,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && isSelected,
    });

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span>{date?.getDate()}</span>
        </IconButton>
      </div>
    );
  };

  return (
    <DatePicker
      value={selectedDate}
      onChange={handleChange}
      variant="static"
      label="FlightDateCalendar"
      disableToolbar={true}
      disablePast={true}
      openTo="date"
      renderDay={renderDay}
    />
  );
};

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
    background: '#9933cc',
    color: theme.palette.common.white,
    borderRadius: '25%',
  },
  // leftHighlight: {
  //   background: '#9933cc',
  //   color: theme.palette.common.white,
  //   borderTopLeftRadius: '25%',
  //   borderBottomLeftRadius: '25%',
  // },
  // rightHighlight: {
  //   background: '#9933cc',
  //   color: theme.palette.common.white,
  //   borderTopRightRadius: '25%',
  //   borderBottomRightRadius: '25%',
  // },
  // rangeHighlight: {
  //   background: '#9933cc',
  //   color: theme.palette.common.white,
  //   opacity: '60%',
  // },
  dateElement: {
    padding: '12px',
    overflow: 'visible',
    textAlign: 'center',
    borderRadius: '50%',
    border: '0',
    display: 'inline-flex',
    outline: '0',
    position: 'relative',
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'center',
    textDecoration: 'none',
    backgroundColor: 'transparent',
  },
  dateElementText: {
    width: '100%',
    display: 'flex',
    alignItems: 'inherit',
    justifyContent: 'inherit',
    fontSize: '0.75rem',
  },
}));
