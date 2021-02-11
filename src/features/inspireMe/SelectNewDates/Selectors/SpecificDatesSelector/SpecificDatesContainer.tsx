import React from 'react';
import { SpecificDatesCalendar } from './SpecificDatesCalendar';

export const SpecificDatesContainer = ({
  tripType,
  closePopup,
}: {
  tripType: '' | 'oneWay' | 'return';
  closePopup: () => void;
}) => {
  return (
    <div>
      <SpecificDatesCalendar tripType={tripType} closePopup={closePopup} />
    </div>
  );
};
