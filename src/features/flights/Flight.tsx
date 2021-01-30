import React, { useEffect, useState } from 'react';
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
        <Hidden xsDown>
          <Grid item xs={5}>
            <CalendarCard
              start={outboundPartialDate}
              end={outboundPartialDate}
            />
          </Grid>
        </Hidden>
        <Grid
          container
          item
          xs={7}
          direction="column"
          justify="space-between"
          alignItems="stretch"
        >
          <FlightDestinations
            fromIata={from.iataCode}
            fromCityName={from.cityName}
            fromCountryName={from.countryName}
            toIata={to.iataCode}
            toCityName={to.cityName}
            toCountryName={to.countryName}
            direct={direct}
          />
          <Grid item>
            <Logo airlineName={carrier.name} />
          </Grid>
          <Grid item>
            <Typography
              style={{
                fontSize: '5rem',
                color: '#9933cc',
                display: 'inline-block',
                marginRight: '0',
                paddingRight: '0',
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

// <CalendarCard start={'2021-02-04'} end={'2021-02-04'} />

// <div
// style={{
//   display: 'flex',
//   flexDirection: 'row',
//   justifyContent: 'flex-end',
// }}
// >
// <ReferralButton
//   origin={originId}
//   destination={destinationId}
//   outboundPartialDate={outboundPartialDate}
//   associateId={associateId}
// />
// </div>

// <Typography>
//   Quote age: {parseTime({ timestamp: quotedAt }).formattedDateTime}
// </Typography>

// <Typography>Price: {cost.formatted}</Typography>

// <Typography>
//   {parseTime({ timestamp: departing }).formattedDate}
// </Typography>

// import React from 'react';
// import { Grid, Paper, Typography } from '@material-ui/core';
// import { FlightType } from '../../type';
// import { parseTime } from '../../helpers/parseTime';
// import { ReferralButton } from './ReferralButton';

// export const Flight: React.FC<FlightType> = ({
//   from,
//   to,
//   departing,
//   carrier,
//   cost,
//   direct,
//   quotedAt,
// }: FlightType) => {
//   if (!from || !to || !departing || !cost) {
//     return <></>;
//   }
//   const originId = from.iataCode;
//   const destinationId = to.iataCode;
//   const outboundPartialDate = departing.slice(0, 10);
//   // This is not a real associate id
//   const associateId = 'letspopto';
//   return (
//     <>
//       <Paper style={{ margin: '8px' }}>
//         <Grid container direction="column" alignContent="stretch">
//           <Grid item>
//             <Typography>
//               {parseTime({ timestamp: departing }).formattedDate}
//             </Typography>
//           </Grid>
//           <Grid item>
//             <Grid
//               container
//               direction="row"
//               justify="space-evenly"
//               alignItems="baseline"
//               spacing={2}
//             >
//               <Grid item xs={3}>
//                 <Grid container direction="column">
//                   <Grid item>
//                     <Typography variant="h2" gutterBottom>
//                       {from.iataCode}
//                     </Typography>
//                   </Grid>
//                   <Grid item>
//                     <Typography variant="subtitle1">{from.cityName}</Typography>
//                   </Grid>
//                   <Grid item>
//                     <Typography variant="overline">
//                       {from.countryName}
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </Grid>

//               <Grid item xs={3}>
//                 <Grid container direction="column" alignItems="center">
//                   <Grid item>
//                     <Typography variant="subtitle2">1:05hr est</Typography>
//                   </Grid>
//                   <Grid item>
//                     <div
//                       style={{
//                         width: '10em',
//                         height: '1px',
//                         borderBottom: '2px solid black',
//                       }}
//                     />
//                   </Grid>
//                   <Grid item>
//                     <Typography variant="caption" style={{ color: 'green' }}>
//                       {direct ? 'direct' : 'not direct'}
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item>
//                 <Grid container direction="column">
//                   <Grid item>
//                     <Typography variant="h2" gutterBottom>
//                       {to.iataCode}
//                     </Typography>
//                   </Grid>
//                   <Grid item>
//                     <Typography variant="subtitle1">{to.cityName}</Typography>
//                   </Grid>
//                   <Grid item>
//                     <Typography variant="overline">{to.countryName}</Typography>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>

//         <Typography>
//           Quote age: {parseTime({ timestamp: quotedAt }).formattedDateTime}
//         </Typography>
//         <Typography>Price: {cost.formatted}</Typography>
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'flex-end',
//           }}
//         >
//           <ReferralButton
//             origin={originId}
//             destination={destinationId}
//             outboundPartialDate={outboundPartialDate}
//             associateId={associateId}
//           />
//         </div>
//       </Paper>
//       {/* <div>
//         <pre>{JSON.stringify(from)}</pre>
//         <pre>{JSON.stringify(to)}</pre>
//         <pre>{JSON.stringify(departing)}</pre>
//         <pre>{JSON.stringify(carrier)}</pre>
//         <pre>{JSON.stringify(cost)}</pre>
//         <pre>{JSON.stringify(direct)}</pre>
//         <pre>{JSON.stringify(quotedAt)}</pre>
//       </div> */}
//     </>
//   );
// };
