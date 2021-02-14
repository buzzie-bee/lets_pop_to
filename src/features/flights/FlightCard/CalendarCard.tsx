import { Badge, BadgeOrigin, makeStyles, Theme } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import clsx from 'clsx';
import React from 'react';

export const CalendarCard = ({
  start,
  end,
}: {
  start: string;
  end: string;
}) => {
  const startDate = new Date(new Date(start).toDateString());
  const startDateTime = startDate.getTime();
  const endDate = new Date(new Date(end).toDateString());
  const endDateTime = endDate.getTime();

  const classes = useStyles();

  const renderDay = (
    date: Date | null,
    _selectedDate: Date | null,
    dayInCurrentMonth: boolean
  ): JSX.Element => {
    const dayTime = date?.getTime();
    const todayTime = new Date(new Date().toDateString()).getTime();

    const isInPast = dayTime ? dayTime < todayTime : false;
    const isRangeStart = dayTime === startDateTime;
    const isRangeEnd = dayTime === endDateTime;
    const isInRange = dayTime
      ? dayTime > startDateTime && dayTime < endDateTime
      : false;

    const wrapperClassName = clsx(classes.dayWrapper, {
      [classes.leftHighlight]: isRangeStart,
      [classes.rightHighlight]: isRangeEnd,
      [classes.rangeHighlight]: isInRange,
    });

    const dayClassName = clsx(classes.day, classes.dateElement, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth || isInPast,
    });

    let badgeContent = '';
    let badgePosition: BadgeOrigin | undefined = {
      vertical: 'top',
      horizontal: 'left',
    };
    if (isRangeStart) {
      badgeContent = '🛫';
    } else if (isRangeEnd) {
      badgeContent = '🛬';
      badgePosition = { vertical: 'top', horizontal: 'right' };
    }

    return (
      <Badge badgeContent={badgeContent} anchorOrigin={badgePosition}>
        <div className={wrapperClassName}>
          <div className={dayClassName}>
            <span className={classes.dateElementText}></span>
            <span>{date?.getDate()}</span>
          </div>
        </div>
      </Badge>
    );
  };

  return (
    <DatePicker
      value={startDate}
      onChange={() => {}}
      variant="static"
      label="FlightDateCalendar"
      disableToolbar={true}
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
  leftHighlight: {
    background: '#9933cc',
    color: theme.palette.common.white,
    borderTopLeftRadius: '25%',
    borderBottomLeftRadius: '25%',
  },
  rightHighlight: {
    background: '#9933cc',
    color: theme.palette.common.white,
    borderTopRightRadius: '25%',
    borderBottomRightRadius: '25%',
  },
  rangeHighlight: {
    background: '#9933cc',
    color: theme.palette.common.white,
    opacity: '60%',
  },
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
