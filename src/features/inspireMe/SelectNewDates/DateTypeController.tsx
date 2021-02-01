import React, { useState } from 'react';
import { Paper } from '@material-ui/core';

import { DateTypeSelector } from './DateTypeSelector';
import { NormalCalendarContainer } from './NormalCalendarContainer';
import { BackButton } from './BackButton';
import { AdvancedTypeSelector } from './AdvancedTypeSelector';
import { SpecificDatesCalendar } from './SpecificDatesCalendar';
import { WeekdaySelector } from './WeekdaySelector';

import './DateTypeController.css';
export const DateTypeController = ({
  direction,
}: {
  direction: '' | 'oneWay' | 'return';
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
        return <SpecificDatesCalendar backButton={backButton} />;

      case '/weekdays':
        return <WeekdaySelector backButton={backButton} />;
      default:
        return <DateTypeSelector switchComponent={switchComponent} />;
    }
  };

  return <Paper className="dateTypeSelectorPaper">{renderPage()}</Paper>;
};
