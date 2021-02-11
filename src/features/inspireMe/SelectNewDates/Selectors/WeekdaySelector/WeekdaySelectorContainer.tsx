import React from 'react';
import { WeekdayCalendar } from './WeekdayCalendar';

export const WeekdaySelectorContainer = ({
  direction,
  closePopup,
}: {
  direction: '' | 'oneWay' | 'return';
  closePopup: () => void;
}) => {
  return (
    <div>
      <WeekdayCalendar direction={direction} closePopup={closePopup} />
    </div>
  );
};
