import React, { useEffect, useState } from 'react';
import { MonthSelector } from './MonthsSelector';
import { WeekdaySelector } from './WeekdaySelector';

export interface WeekdayType {
  weekday:
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday';
  selected: boolean;
}

interface SelectionsType {
  outbound: WeekdayType[];
  inbound: WeekdayType[];
  months: string[];
}

const initialState: SelectionsType = {
  outbound: [
    {
      weekday: 'Monday',
      selected: false,
    },
    {
      weekday: 'Tuesday',
      selected: false,
    },
    {
      weekday: 'Wednesday',
      selected: false,
    },
    {
      weekday: 'Thursday',
      selected: false,
    },
    {
      weekday: 'Friday',
      selected: false,
    },
    {
      weekday: 'Saturday',
      selected: false,
    },
    {
      weekday: 'Sunday',
      selected: false,
    },
  ],
  inbound: [
    {
      weekday: 'Monday',
      selected: false,
    },
    {
      weekday: 'Tuesday',
      selected: false,
    },
    {
      weekday: 'Wednesday',
      selected: false,
    },
    {
      weekday: 'Thursday',
      selected: false,
    },
    {
      weekday: 'Friday',
      selected: false,
    },
    {
      weekday: 'Saturday',
      selected: false,
    },
    {
      weekday: 'Sunday',
      selected: false,
    },
  ],
  months: [],
};

export const WeekdaySelectorContainer = ({
  tripType,
  closePopup,
}: {
  tripType: '' | 'oneWay' | 'return';
  closePopup: () => void;
}) => {
  const [selections, setSelections] = useState<SelectionsType>(initialState);
  const [component, setComponent] = useState<'outbound' | 'inbound' | 'months'>(
    'outbound'
  );

  const handleDaySelections = (updatedSelections: WeekdayType[]): void => {
    if (component === 'outbound') {
      console.log('setting outbound');
      setSelections({ ...selections, outbound: updatedSelections });
    }
    if (component === 'inbound') {
      //
      console.log('setting inbound');
      setSelections({ ...selections, inbound: updatedSelections });
    }
  };

  const handleMonthSelections = (updatedSelections: string[]) => {
    console.log('setting months');
    setSelections({ ...selections, months: updatedSelections });
  };

  useEffect(() => {
    console.log(selections);
  }, [selections]);

  return (
    <div>
      {component === 'outbound' && (
        <WeekdaySelector
          tripType={tripType}
          direction="outbound"
          setComponent={setComponent}
          handleDaySelections={handleDaySelections}
        />
      )}
      {component === 'inbound' && (
        <WeekdaySelector
          tripType={tripType}
          direction="inbound"
          setComponent={setComponent}
          handleDaySelections={handleDaySelections}
        />
      )}
      {component === 'months' && (
        <MonthSelector
          closePopup={closePopup}
          setComponent={setComponent}
          handleMonthSelections={handleMonthSelections}
        />
      )}
    </div>
  );
};
