import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { FlightType } from '../../type';

export const FlightCard = ({
  from,
  to,
  departing,
  carrier,
  cost,
  direct,
  quotedAt,
}: FlightType) => {
  return (
    <>
      <Paper>
        <Typography>Flight</Typography>
      </Paper>
      <div>
        <pre>{JSON.stringify(from)}</pre>
        <pre>{JSON.stringify(to)}</pre>
        <pre>{JSON.stringify(departing)}</pre>
        <pre>{JSON.stringify(carrier)}</pre>
        <pre>{JSON.stringify(cost)}</pre>
        <pre>{JSON.stringify(direct)}</pre>
        <pre>{JSON.stringify(quotedAt)}</pre>
      </div>
    </>
  );
};
