import { Button } from '@material-ui/core';
import React from 'react';

interface DateTypeSelectorProps {
  switchComponent: (component: string) => void;
}

export const DateTypeSelector = ({
  switchComponent,
}: DateTypeSelectorProps) => {
  return (
    <div className="dateTypeSelectorContainer">
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
  );
};
