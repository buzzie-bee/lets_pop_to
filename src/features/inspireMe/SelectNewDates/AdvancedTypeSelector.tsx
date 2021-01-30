import React from 'react';
import { Button } from '@material-ui/core';
import './AdvancedTypeSelector.css';

interface AdvancedTypeSelectorProps {
  switchComponent: (component: string) => void;
}

export const AdvancedTypeSelector = ({
  switchComponent,
}: AdvancedTypeSelectorProps) => {
  return (
    <div className="buttonContainer">
      <Button
        className="dateTypeButton"
        variant="outlined"
        size="large"
        onClick={() => {
          switchComponent('/specificDates');
        }}
      >
        Specific Dates
      </Button>
      <Button
        className="dateTypeButton"
        variant="outlined"
        size="large"
        onClick={() => {
          switchComponent('/daysOfTheWeek');
        }}
      >
        Days of the week
      </Button>
    </div>
  );
};
