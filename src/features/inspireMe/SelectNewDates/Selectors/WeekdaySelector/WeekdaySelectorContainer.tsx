import React from 'react';
import { WeekdayCalendar } from './WeekdayCalendar';

export const WeekdaySelectorContainer = ({
  backButton,
  direction,
  closePopup,
}: {
  backButton: JSX.Element;
  direction: '' | 'oneWay' | 'return';
  closePopup: () => void;
}) => {
  return (
    <div>
      {backButton}
      <WeekdayCalendar direction={direction} closePopup={closePopup} />
    </div>
  );
};
