import React from 'react';
// import { BackButton } from './BackButton';
import { NormalCalendar } from './NormalCalendar';
export const NormalCalendarContainer = ({
  direction,
}: {
  direction: '' | 'oneWay' | 'return';
}) => {
  return (
    <div>
      <NormalCalendar direction={direction} />
    </div>
  );
};
