import React from 'react';
// import { BackButton } from './BackButton';
import { NormalCalendar } from './NormalCalendar';
export const NormalCalendarContainer = ({
  tripType,
}: {
  tripType: '' | 'oneWay' | 'return';
}) => {
  return (
    <div>
      <NormalCalendar tripType={tripType} />
    </div>
  );
};
