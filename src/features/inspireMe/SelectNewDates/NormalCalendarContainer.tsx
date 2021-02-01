import React from 'react';
// import { BackButton } from './BackButton';
import { NormalCalendar } from './Calendars/NormalCalendar';
export const NormalCalendarContainer = ({
  backButton,
}: {
  backButton: JSX.Element;
}) => {
  return (
    <div>
      {backButton}
      <NormalCalendar direction={'oneWay'} />
    </div>
  );
};
