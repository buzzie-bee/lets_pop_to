import React from 'react';
import { SpecificDatesCalendar } from './SpecificDatesCalendar';

export const SpecificDatesContainer = ({
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
      <SpecificDatesCalendar direction={direction} closePopup={closePopup} />
    </div>
  );
};
