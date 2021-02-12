import React from 'react';
// import { BackButton } from './BackButton';
import { NormalCalendar } from './NormalCalendar';
export const NormalCalendarContainer = ({
  tripType,
  closePopup,
}: {
  tripType: '' | 'oneWay' | 'return';
  closePopup: () => void;
}) => {
  return (
    <div>
      <NormalCalendar tripType={tripType} closePopup={closePopup} />
    </div>
  );
};
