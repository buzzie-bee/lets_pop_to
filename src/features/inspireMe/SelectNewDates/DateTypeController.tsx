import React, { useState } from 'react';
import { Paper } from '@material-ui/core';

import { DateTypeSelector } from './DateTypeSelector';
import { NormalCalendar } from './NormalCalendar';
import { BackButton } from './BackButton';
import { AdvancedTypeSelector } from './AdvancedTypeSelector';
import './DateTypeController.css';

export const DateTypeController = () => {
  const [component, setComponent] = useState<string>('/');
  const [history, setHistory] = useState<string[]>(['/']);

  const switchComponent = (newComponent: string): void => {
    setHistory([...history, component]);
    setComponent(newComponent);
  };

  const renderPage = () => {
    switch (component) {
      case '/':
        return <DateTypeSelector switchComponent={switchComponent} />;
      case '/normal':
        return (
          <div>
            <BackButton
              history={history}
              setHistory={setHistory}
              setComponent={setComponent}
            />
            <NormalCalendar />
          </div>
        );
      case '/advanced':
        return (
          <>
            <BackButton
              history={history}
              setHistory={setHistory}
              setComponent={setComponent}
            />
            <AdvancedTypeSelector switchComponent={switchComponent} />
          </>
        );
      default:
        return <DateTypeSelector switchComponent={switchComponent} />;
    }
  };

  return (
    <Paper className="dateTypeSelectorPaper">
      <div style={{ width: '100%', textAlign: 'center' }}>{component}</div>
      {renderPage()}
    </Paper>
  );
};
