import { range } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isNumeric } from '../../../../../helpers/isNumeric';
import {
  setDates,
  setWeekdaySelections,
  setDurationRange as setDurationRangeAction,
  setMonths,
} from '../../../slice/inspireMeSlice';
import { MonthSelector } from './MonthsSelector';
import { WeekdaySelector } from './WeekdaySelector';
import {
  DateType,
  InspireMeStateType,
  MonthType,
  SelectionsType,
  WeekdayType,
} from './../../../../../type';
import { RootState } from '../../../../../redux/store';

export const WeekdaySelectorContainer = ({
  tripType,
  closePopup,
}: {
  tripType: '' | 'oneWay' | 'return';
  closePopup: () => void;
}) => {
  const { weekdaySelections: selections }: InspireMeStateType = useSelector(
    (state: RootState) => state.inspireMe
  );
  // const [selections, setSelections] = useState<SelectionsType>(initialState);
  const [component, setComponent] = useState<'outbound' | 'inbound' | 'months'>(
    'outbound'
  );
  const [durationRange, setDurationRange] = useState<number[]>([0, 14]);
  const [completed, setCompleted] = useState<boolean>(false);

  const dispatch = useDispatch();

  const setSelections = (selections: SelectionsType) => {
    dispatch(setWeekdaySelections(selections));
  };

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

  const handleMonthSelections = (months: MonthType[]) => {
    console.log('setting months');
    const selectedMonths = months.filter((month) => month.selected);
    setSelections({ ...selections, months: selectedMonths });
    dispatch(setMonths(months));
  };

  const handleDurationRange = (durationRange: number[]) => {
    setDurationRange(durationRange);
    dispatch(setDurationRangeAction(durationRange));
  };

  const calculateAndSetDates = useCallback(() => {
    const { outbound, inbound, months } = selections;

    const outboundDays = outbound
      .filter((outbound) => outbound.selected)
      .map((outbound) => outbound.weekday);

    const inboundDays = inbound
      .filter((inbound) => inbound.selected)
      .map((inbound) => inbound.weekday);
    const outboundDates: string[] = [];

    months.forEach(({ year, month, name }) => {
      const dayCount: number = daysInMonth({ year, month });
      for (let i of range(dayCount)) {
        const weekDay = getWeekdayFromMonth({ day: i, month, year });
        if (checkWeekday(weekDay)) {
          //@ts-ignore because typescript doesn't realise that I've already checked
          // the type of weekDay is correct
          if (outboundDays.includes(weekDay)) {
            outboundDates.push(`${year}-${month}-${i < 10 ? `0${i}` : i}`);
          }
        }
      }
    });
    if (!outboundDates.length) {
      // TODO: handle possible (though unlikely as it's been checked) error here
      return;
    }

    if (tripType === 'oneWay') {
      dispatch(
        setDates(
          outboundDates.map((date) => {
            return { outbound: date, inbound: '' };
          })
        )
      );
      closePopup();
      return;
    }

    let dateArray: DateType[] = [];

    outboundDates.forEach((date) => {
      for (let i of range(durationRange[0], durationRange[1])) {
        const newDate = datePlusDays({ date, days: i });
        if (newDate) {
          const weekDay = getWeekdayFromDate({ date: newDate });
          if (checkWeekday(weekDay)) {
            //@ts-ignore
            if (inboundDays.includes(weekDay)) {
              dateArray.push({ outbound: date, inbound: newDate });
            }
          }
        }
      }
    });

    if (!dateArray.length) {
      // TODO: also error handle
      return;
    }

    dispatch(setDates(dateArray));
    closePopup();
  }, [closePopup, dispatch, durationRange, selections, tripType]);

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
        calculateAndSetDates();
      }
    }
  }, [selections, completed, checkValid, calculateAndSetDates]);

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
          handleMonthSelections={handleMonthSelections}
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
  // Bit hacky but setting the day to be 0 gives the last day of the month === day count
  const yearNum = isNumeric(year) ? parseInt(year) : 2021;
  const monthNum = isNumeric(month) ? parseInt(month) : 9;
  return new Date(yearNum, monthNum, 0).getDate();
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

const getWeekdayFromMonth = ({
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

const getWeekdayFromDate = ({ date }: { date: string }) => {
  const dayNum: number = new Date(date).getDay();
  const weekday: string = days[dayNum];
  return weekday;
};

const checkWeekday = (day: string) => {
  return (
    day === 'Monday' ||
    day === 'Tuesday' ||
    day === 'Wednesday' ||
    day === 'Thursday' ||
    day === 'Friday' ||
    day === 'Saturday' ||
    day === 'Sunday'
  );
};

const datePlusDays = ({
  date,
  days,
}: {
  date: string;
  days: number;
}): string => {
  const dateDate = new Date(date);
  const plusDays = new Date(dateDate.setDate(dateDate.getDate() + days));
  return plusDays.toISOString().substr(0, 10);
};
