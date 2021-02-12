import { InspireMeStateType, MonthType, SelectionsType } from '../../../type';

const initialWeekdayState: SelectionsType = {
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

const calendarMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const setInitialDatesState = (): MonthType[] => {
  const todaysDate = new Date(new Date());
  const todaysMonth = todaysDate.getMonth();
  const todaysYear = todaysDate.getFullYear();
  const nextYear = todaysYear + 1;

  const selectableMonths = [
    ...calendarMonths
      .slice(todaysMonth)
      .map((month) => `${month} ${todaysYear}`),
    ...calendarMonths
      .slice(0, todaysMonth)
      .map((month) => `${month} ${nextYear}`),
  ];

  const initialDatesState: MonthType[] = selectableMonths.map((name, idx) => {
    const monthNum =
      todaysMonth + idx + 1 <= 12
        ? todaysMonth + idx + 1
        : todaysMonth + idx + 1 - 12;
    const monthString = `${monthNum < 10 ? '0' : ''}${monthNum}`;
    return {
      name,
      month: monthString,
      year: `${todaysMonth + idx + 1 < 13 ? todaysYear : nextYear}`,
      selected: false,
    };
  });
  return initialDatesState;
};

export const inspireMeInitialState: InspireMeStateType = {
  from: null,
  dates: [],
  tripType: '',
  selectorType: 'Normal',
  weekdaySelections: initialWeekdayState,
  durationRange: [0, 14],
  months: setInitialDatesState(),
};
