import React, { useEffect } from 'react';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { FlightType } from '../../type';
import { parseTime } from '../../helpers/parseTime';
import { ReferralButton } from './ReferralButton';

export const Flight: React.FC<FlightType> = ({
  from,
  to,
  departing,
  carrier,
  cost,
  direct,
  quotedAt,
}: FlightType) => {
  if (!from || !to || !departing || !cost) {
    return <></>;
  }
  const originId = from.iataCode;
  const destinationId = to.iataCode;
  const outboundPartialDate = departing.slice(0, 10);
  const associateId = 'letspopto';
  return (
    <>
      <Paper style={{ margin: '8px' }}>
        <Grid container direction="column" alignContent="stretch">
          <Grid item>
            <Typography>
              {parseTime({ timestamp: departing }).formattedDate}
            </Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="baseline"
              spacing={2}
            >
              <Grid item xs={3}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="h2" gutterBottom>
                      {from.iataCode}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">{from.cityName}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="overline">
                      {from.countryName}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <Grid container direction="column" alignItems="center">
                  <Grid item>
                    <Typography variant="subtitle2">1:05hr est</Typography>
                  </Grid>
                  <Grid item>
                    <div
                      style={{
                        width: '10em',
                        height: '1px',
                        borderBottom: '2px solid black',
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="caption" style={{ color: 'green' }}>
                      {direct ? 'direct' : 'not direct'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="h2" gutterBottom>
                      {to.iataCode}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">{to.cityName}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="overline">{to.countryName}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Typography>
          Quote age: {parseTime({ timestamp: quotedAt }).formattedDateTime}
        </Typography>
        <Typography>Price: {cost.formatted}</Typography>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <ReferralButton
            origin={originId}
            destination={destinationId}
            outboundPartialDate={outboundPartialDate}
            associateId={associateId}
          />
        </div>
      </Paper>
      {/* <div>
        <pre>{JSON.stringify(from)}</pre>
        <pre>{JSON.stringify(to)}</pre>
        <pre>{JSON.stringify(departing)}</pre>
        <pre>{JSON.stringify(carrier)}</pre>
        <pre>{JSON.stringify(cost)}</pre>
        <pre>{JSON.stringify(direct)}</pre>
        <pre>{JSON.stringify(quotedAt)}</pre>
      </div> */}
    </>
  );
};
