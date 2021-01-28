import React, { useEffect, useState } from 'react';
import { Button, Popover } from '@material-ui/core';
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks';

import MultiDatePicker from './MultiDatePicker';

interface SelectDatesProps {
  dates?: string[];
  handleSetDates: (dates: Date[]) => void;
}

export const SelectDates: React.FC<SelectDatesProps> = ({
  dates,
  handleSetDates,
}: SelectDatesProps) => {
  const [selectedDates, updateSelectedDates] = useState<Date[]>([]);

  useEffect(() => {
    if (dates) {
      const dateTypeDates = dates.map((date) => new Date(date));
      updateSelectedDates(dateTypeDates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSetDates(selectedDates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDates]);

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'multiDatePicker',
  });

  return (
    <>
      <Button variant="outlined" size="large" {...bindTrigger(popupState)}>
        Select Dates
      </Button>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MultiDatePicker
          selectedDates={selectedDates}
          updateSelectedDates={updateSelectedDates}
        />
      </Popover>
    </>
  );
};

export default SelectDates;
