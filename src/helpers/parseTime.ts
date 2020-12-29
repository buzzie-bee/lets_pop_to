interface ParseTimeParameters {
  timestamp: string;
  region?: string | undefined;
}
interface ParseTimeOutputs {
  formattedDate: string;
  formattedTime: string;
  formattedDateTime: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  timestamp: Date;
}

export const parseTime = ({
  timestamp,
  region,
}: ParseTimeParameters): ParseTimeOutputs => {
  // Good guide on how to make date formatted for specific locales
  // https://www.toptal.com/software/definitive-guide-to-datetime-manipulation
  const isoTimeStamp = new Date(timestamp);

  const formattedDate = isoTimeStamp.toLocaleString(region, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const formattedTime = isoTimeStamp.toLocaleString(region, {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedDateTime = isoTimeStamp.toLocaleString(region, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return {
    formattedDate,
    formattedTime,
    formattedDateTime,
    year: isoTimeStamp.getFullYear(),
    month: isoTimeStamp.getMonth(),
    day: isoTimeStamp.getDay(),
    hour: isoTimeStamp.getHours(),
    minute: isoTimeStamp.getMinutes(),
    timestamp: isoTimeStamp,
  };
};
