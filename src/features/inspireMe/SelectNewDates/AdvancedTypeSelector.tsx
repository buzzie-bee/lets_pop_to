import React from 'react';
import { Button } from '@material-ui/core';
import './AdvancedTypeSelector.css';

interface AdvancedTypeSelectorProps {
  switchComponent: (component: string) => void;
  backButton: JSX.Element;
}

export const AdvancedTypeSelector = ({
  switchComponent,
  backButton,
}: AdvancedTypeSelectorProps) => {
  return (
    <div className="advancedTypeSelectorContainer">
      {backButton}

      <div className="buttonContainer">
        <Button
          className="dateTypeButton"
          variant="outlined"
          size="large"
          onClick={() => {
            switchComponent('/specific');
          }}
        >
          Specific Dates
        </Button>
        <Button
          className="dateTypeButton"
          variant="outlined"
          size="large"
          onClick={() => {
            switchComponent('/weekdays');
          }}
        >
          Days of the week
        </Button>
      </div>
    </div>
  );
};
