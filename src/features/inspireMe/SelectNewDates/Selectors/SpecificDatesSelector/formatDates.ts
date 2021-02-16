import { DateType } from '../../../../../type';

export const formatDates = ({ outbound, inbound }: DateType): string => {
  if (!outbound || !inbound) {
    // console.log('not correct dates =>', { outbound, inbound });
    return '';
  }
  const outboundDate = new Date(new Date(outbound).toDateString());
  const inboundDate = new Date(new Date(inbound).toDateString());

  const outboundWeekday = days[outboundDate.getDay()].substr(0, 3);
  const outboundDay = outboundDate.getDate();
  const outboundDayOrdinals = getOrdinals(outboundDate.getDate());
  const outboundMonth = months[outboundDate.getMonth()].substr(0, 3);
  const outboundYear = outboundDate.toDateString().substring(13, 15);

  const outboundFormatted = `${outboundWeekday} ${outboundDay}${outboundDayOrdinals} ${outboundMonth} ${outboundYear}`;

  const inboundWeekday = days[inboundDate.getDay()].substr(0, 3);
  const inboundDay = inboundDate.getDate();
  const inboundDayOrdinals = getOrdinals(inboundDate.getDate());
  const inboundMonth = months[inboundDate.getMonth()].substr(0, 3);
  const inboundYear = inboundDate.toDateString().substring(13, 15);

  const inboundFormatted = `${inboundWeekday} ${inboundDay}${inboundDayOrdinals} ${inboundMonth} ${inboundYear}`;

  const formattedDate = `${outboundFormatted}    to    ${inboundFormatted}`;

  return formattedDate;
};

const getOrdinals = (day: number) => {
  switch (day) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
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

const months = [
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
