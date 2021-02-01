import { Button } from '@material-ui/core';
import React from 'react';

import './DateTypeSelector.css';

interface DateTypeSelectorProps {
  switchComponent: (component: string) => void;
}

export const DateTypeSelector = ({
  switchComponent,
}: DateTypeSelectorProps) => {
  return (
    <div className="dateTypeSelectorContainer">
      <div className="buttonFiller" />
      <div className="dateTypeButtonContainer">
        <Button
          className="dateTypeButton"
          variant="outlined"
          size="large"
          onClick={() => {
            switchComponent('/normal');
          }}
        >
          Normal Search
        </Button>
        <Button
          className="dateTypeButton"
          variant="outlined"
          size="large"
          onClick={() => {
            switchComponent('/advanced');
          }}
        >
          Advanced Search
        </Button>
      </div>
    </div>
  );
};
