import React from 'react';
// import { BackButton } from './BackButton';
import { NormalCalendar } from './NormalCalendar';
export const NormalCalendarContainer = ({
  backButton,
  direction,
}: {
  backButton: JSX.Element;
  direction: '' | 'oneWay' | 'return';
}) => {
  return (
    <div>
      {backButton}
      <NormalCalendar direction={direction} />
    </div>
  );
};
