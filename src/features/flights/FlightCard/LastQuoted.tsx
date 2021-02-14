import { Typography } from '@material-ui/core';
import { parseTime } from '../../../helpers/parseTime';

export const LastQuoted = ({ timestamp }: { timestamp: string }) => {
  return (
    <Typography variant="overline">
      *Last live price fetched: {parseTime({ timestamp }).formattedDateTime}
    </Typography>
  );
};
