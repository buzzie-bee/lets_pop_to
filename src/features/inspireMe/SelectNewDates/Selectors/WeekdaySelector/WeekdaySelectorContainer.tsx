import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

export interface MonthType {
  // TODO: find a better way to say a number between range, or a number with x characters
  name: string;
  month: string;
  year: string;
  selected: boolean;
}

interface SelectionsType {
  outbound: WeekdayType[];
  inbound: WeekdayType[];
  months: MonthType[];
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
  const [durationRange, setDurationRange] = useState<number[]>([0, 14]);
  const [completed, setCompleted] = useState<boolean>(false);

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

  const handleMonthSelections = (updatedSelections: MonthType[]) => {
    console.log('setting months');
    setSelections({ ...selections, months: updatedSelections });
  };

  const handleDurationRange = (durationRange: number[]) => {
    setDurationRange(durationRange);
  };

  const setDates = useCallback(() => {
    const { outbound, inbound, months } = selections;
    console.log(outbound);
    console.log(inbound);
    console.log(months);
    console.log(durationRange);
  }, [durationRange, selections]);

  const checkValid = useCallback((): boolean => {
    const { outbound, inbound, months } = selections;

    const outboundCheck = outbound.filter((day) => day.selected).length > 0;
    const inboundCheck =
      tripType === 'return'
        ? inbound.filter((day) => day.selected).length > 0
        : true;
    const monthsCheck = months.filter((month) => month.selected).length > 0;

    return outboundCheck && inboundCheck && monthsCheck;
  }, [selections, tripType]);

  useEffect(() => {
    if (completed) {
      if (checkValid()) {
        setDates();
      }
    }
  }, [selections, completed, checkValid, setDates]);

  return (
    <div>
      {component === 'outbound' && (
        <WeekdaySelector
          tripType={tripType}
          direction="outbound"
          setComponent={setComponent}
          handleDaySelections={handleDaySelections}
          handleDurationRange={handleDurationRange}
        />
      )}
      {component === 'inbound' && (
        <WeekdaySelector
          tripType={tripType}
          direction="inbound"
          setComponent={setComponent}
          handleDaySelections={handleDaySelections}
          handleDurationRange={handleDurationRange}
        />
      )}
      {component === 'months' && (
        <MonthSelector
          closePopup={closePopup}
          handleMonthSelections={handleMonthSelections}
          setDates={setDates}
          setCompleted={setCompleted}
        />
      )}
    </div>
  );
};

const daysInMonth = ({
  year,
  month,
}: {
  year: string;
  month: string;
}): number => {
  // Had to do this because typescript won't allow strings in position param,
  // but will allow a string to be passed as the whole argument (same below)
  const stringDate = `${year}-${month}-0`;
  return new Date(stringDate).getDate();
};

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const getWeekday = ({
  day,
  month,
  year,
}: {
  day: number;
  month: string;
  year: string;
}) => {
  const stringDate = `${year}-${month}-${day < 10 ? `0${day}` : `${day}`}`;
  const dayNum: number = new Date(stringDate).getDay();
  const weekday: string = days[dayNum];
  return weekday;
};
