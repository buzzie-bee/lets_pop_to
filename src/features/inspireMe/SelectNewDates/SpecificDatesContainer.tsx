import React from 'react';
import { SpecificDatesCalendar } from './Calendars/SpecificDatesCalendar';

export const SpecificDatesContainer = ({
  backButton,
  direction,
}: {
  backButton: JSX.Element;
  direction: '' | 'oneWay' | 'return';
}) => {
  return (
    <div>
      <div>
        {backButton}
        <SpecificDatesCalendar direction={direction} />
      </div>
    </div>
  );
};
