import React from 'react';
import { Grid, Hidden, makeStyles, Paper } from '@material-ui/core';

import { ReferralButton } from './ReferralButton';
import { CalendarCard } from './CalendarCard';

import { FlightType } from '../../../type';
import { FlightDetailsCard } from './FlightDetailsCard/FlightDetailsCard';
import { Price } from './Price';
import { LastQuoted } from './LastQuoted';

export const FlightCard: React.FC<FlightType> = ({
  outbound,
  inbound,
  cost,
  direct,
  quotedAt,
}: FlightType) => {
  const { from, to, departing, carrier } = outbound;

  const classes = useStyles();

  if (!from || !to || !departing || !cost) {
    return <></>;
  }

  let inboundFrom = undefined;
  let inboundTo = undefined;
  let inboundDeparting = undefined;
  let inboundCarrier = undefined;

  if ('from' in inbound) {
    inboundFrom = inbound.from;
    inboundTo = inbound.to;
    inboundDeparting = inbound.departing;
    inboundCarrier = inbound.carrier;
  }

  const originId = from.iataCode;
  const destinationId = to.iataCode;
  const outboundPartialDate = departing.slice(0, 10);
  const inboundPartialDate = inboundDeparting
    ? inboundDeparting.slice(0, 10)
    : outboundPartialDate;
  // This is not a real associate id - not signed up for skyscanner affiliate program
  const associateId = 'letspopto';

  return (
    <Paper className={classes.cardPaper}>
      <Grid container direction="row" justify="space-between">
        <Hidden smDown>
          <Grid item xs={5}>
            <Grid
              container
              item
              direction="column"
              justify="flex-start"
              alignItems="center"
              className={classes.calendarGridItem}
            >
              <Grid item>
                <CalendarCard
                  start={outboundPartialDate}
                  end={inboundPartialDate}
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
            <FlightDetailsCard
              from={from}
              to={to}
              carrier={carrier}
              departing={departing}
              direct={direct}
              direction="Outbound"
            />
          </Grid>
          {inboundFrom && inboundCarrier && inboundTo && inboundDeparting && (
            <Grid item>
              <FlightDetailsCard
                from={inboundFrom}
                to={inboundTo}
                carrier={inboundCarrier}
                departing={inboundDeparting}
                direct={direct}
                direction="Return"
              />
            </Grid>
          )}
          <Grid container item direction="column" justify="center">
            <Grid item>
              <Price price={cost.formatted} />
            </Grid>
            <Grid item>
              <LastQuoted timestamp={quotedAt} />
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

const useStyles = makeStyles((theme) => ({
  cardPaper: {
    margin: '8px',
  },
  calendarGridItem: {
    height: '100%',
    paddingTop: '32px',
  },
}));
