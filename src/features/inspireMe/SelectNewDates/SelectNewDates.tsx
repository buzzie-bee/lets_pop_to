import React, { useEffect, useState } from 'react';
import { Button, Popover } from '@material-ui/core';
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks';

// import MultiDatePicker from './MultiDatePicker';
import { DateSelector } from './DateSelector';

interface SelectDatesProps {
  dates?: string[];
  handleSetDates: (dates: Date[]) => void;
  disabled: boolean;
  directional: 'oneWay' | 'return' | '';
}

export const SelectNewDates: React.FC<SelectDatesProps> = ({
  dates,
  handleSetDates,
  disabled,
  directional,
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

  const closePopup = () => {
    if (popupState.isOpen) {
      popupState.close();
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        disabled={disabled}
        size="large"
        {...bindTrigger(popupState)}
      >
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
        <DateSelector direction={directional} closePopup={closePopup} />
      </Popover>
    </>
  );
};

export default SelectNewDates;
