import React, { useState } from 'react';
import { Paper } from '@material-ui/core';

import { DateTypeSelector } from './DateTypeSelector';
import { NormalCalendarContainer } from './Selectors/NormalSelector/NormalCalendarContainer';
import { BackButton } from './BackButton';
import { AdvancedTypeSelector } from './AdvancedTypeSelector';
import { SpecificDatesContainer } from './Selectors/SpecificDatesSelector/SpecificDatesContainer';
import { WeekdaySelectorContainer } from './Selectors/WeekdaySelector/WeekdaySelectorContainer';

import './DateTypeController.css';
export const DateTypeController = ({
  direction,
  closePopup,
}: {
  direction: '' | 'oneWay' | 'return';
  closePopup: () => void;
}) => {
  const [component, setComponent] = useState<string>('/');
  const [history, setHistory] = useState<string[]>(['/']);

  const switchComponent = (newComponent: string): void => {
    setHistory([...history, component]);
    setComponent(newComponent);
  };

  const renderPage = () => {
    const backButton: JSX.Element = (
      <BackButton
        history={history}
        setHistory={setHistory}
        setComponent={setComponent}
      />
    );

    switch (component) {
      case '/':
        return <DateTypeSelector switchComponent={switchComponent} />;
      case '/normal':
        return (
          <NormalCalendarContainer
            backButton={backButton}
            direction={direction}
          />
        );
      case '/advanced':
        return (
          <AdvancedTypeSelector
            switchComponent={switchComponent}
            backButton={backButton}
          />
        );
      case '/specific':
        return (
          <SpecificDatesContainer
            backButton={backButton}
            direction={direction}
            closePopup={closePopup}
          />
        );

      case '/weekdays':
        return (
          <WeekdaySelectorContainer
            backButton={backButton}
            direction={direction}
            closePopup={closePopup}
          />
        );
      default:
        return <DateTypeSelector switchComponent={switchComponent} />;
    }
  };

  return <Paper className="dateTypeSelectorPaper">{renderPage()}</Paper>;
};
