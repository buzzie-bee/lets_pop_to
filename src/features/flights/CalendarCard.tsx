import {
  Badge,
  BadgeOrigin,
  IconButton,
  // makeStyles,
  // Theme,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import clsx from 'clsx';
import React from 'react';

import './CalendarCard.css';

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

    const wrapperClassName = clsx('dayWrapper', {
      leftHighlight: isRangeStart,
      rightHighlight: isRangeEnd,
      rangeHighlight: isInRange,
    });

    const dayClassName = clsx('day', {
      nonCurrentMonthDay: !dayInCurrentMonth || isInPast,
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
          <IconButton className={dayClassName}>
            <span>{date?.getDate()}</span>
          </IconButton>
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
