import React from 'react';
import { SpecificDatesCalendar } from './SpecificDatesCalendar';

export const SpecificDatesContainer = ({
  direction,
  closePopup,
}: {
  direction: '' | 'oneWay' | 'return';
  closePopup: () => void;
}) => {
  return (
    <div>
      <SpecificDatesCalendar direction={direction} closePopup={closePopup} />
    </div>
  );
};
