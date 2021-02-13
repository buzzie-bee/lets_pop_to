import React from 'react';
import { Button, Popover } from '@material-ui/core';
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks';

import { DateSelector } from './DateSelector';

interface SelectDatesProps {
  disabled: boolean;
  tripType: 'oneWay' | 'return' | '';
}

export const SelectNewDates: React.FC<SelectDatesProps> = ({
  disabled,
  tripType,
}: SelectDatesProps) => {
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
        <DateSelector tripType={tripType} closePopup={closePopup} />
      </Popover>
    </>
  );
};

export default SelectNewDates;
