import React from 'react';
import { Grid, Hidden, Paper, Typography } from '@material-ui/core';
import { ReferralButton } from './ReferralButton';
import { CalendarCard } from './CalendarCard';
import { FlightDestinations } from './FlightDestinations';
import { FlightType } from '../../type';
import { parseTime } from '../../helpers/parseTime';
import { Logo } from './Logo';

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
  // This is not a real associate id
  const associateId = 'letspopto';

  return (
    <Paper style={{ margin: '8px' }}>
      <Grid container direction="row" justify="space-between">
        <Hidden smDown>
          <Grid item xs={5}>
            <Grid
              container
              item
              direction="column"
              justify="space-around"
              alignItems="flex-start"
              style={{ height: '100%' }}
            >
              <Grid item>
                <CalendarCard
                  start={outboundPartialDate}
                  end={outboundPartialDate}
                />
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        <Grid
          container
          item
          md={7}
          xs={12}
          direction="column"
          justify="space-between"
          alignItems="stretch"
        >
          <Grid item>
            <Paper style={{ padding: '4px', margin: '8px' }}>
              <div style={{ display: 'inline' }}>
                <Typography variant="button">Outbound</Typography>
                <div style={{ display: 'inline', marginLeft: '8px' }}>
                  {departing.slice(0, 10)}
                </div>
              </div>

              <Grid
                container
                item
                direction="row"
                justify="space-around"
                alignItems="flex-start"
              >
                <Grid item>
                  <Logo airlineName={carrier.name} />
                  <Typography
                    style={{ marginTop: '-8px', fontWeight: 'lighter' }}
                  >
                    {carrier.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <FlightDestinations
                    fromIata={from.iataCode}
                    fromCityName={from.cityName}
                    fromCountryName={from.countryName}
                    toIata={to.iataCode}
                    toCityName={to.cityName}
                    toCountryName={to.countryName}
                    direct={direct}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid container item direction="column" justify="center">
            <Grid item>
              <Typography style={{ marginTop: '1rem' }}>
                <span style={{ fontWeight: 'lighter' }}>From:</span>
              </Typography>
              <Typography
                style={{
                  fontSize: '5rem',
                  color: '#9933cc',
                  display: 'inline-block',
                  marginRight: '0',
                  paddingRight: '0',
                  lineHeight: '1.0',
                }}
              >
                {cost.formatted}
              </Typography>
              <Typography
                style={{
                  fontSize: '2rem',
                  color: '#9933cc',
                  display: 'inline-block',
                  marginLeft: '0',
                  paddingLeft: '0',
                }}
              >
                .00*
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="overline">
                *Last live price fetched:{' '}
                {parseTime({ timestamp: quotedAt }).formattedDateTime}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            item
            direction="row"
            justify="flex-end"
            alignItems="baseline"
          >
            <ReferralButton
              origin={originId}
              destination={destinationId}
              outboundDate={outboundPartialDate}
              associateId={associateId}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
