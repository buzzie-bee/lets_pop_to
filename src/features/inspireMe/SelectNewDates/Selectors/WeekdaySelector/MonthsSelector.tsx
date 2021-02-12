import React from 'react';

export const MonthSelector = ({
  closePopup,
  setComponent,
  handleMonthSelections,
}: {
  closePopup: () => void;
  setComponent: (component: 'outbound' | 'inbound' | 'months') => void;
  handleMonthSelections: (updatedSelections: string[]) => void;
}) => {
  return (
    <div>
      <div>MonthSelector</div>
      <div>Waddup</div>
    </div>
  );
};
