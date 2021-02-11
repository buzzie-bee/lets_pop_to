import React, { useState } from 'react';
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

  return (
    <div>
      <WeekdaySelector tripType={tripType} closePopup={closePopup} />
    </div>
  );
};
