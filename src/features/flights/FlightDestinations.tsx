import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { DestinationDivider } from './DestinationDivider';
import './FlightDestinations.css';

export const FlightDestinations = ({
  fromIata,
  fromCityName,
  fromCountryName,
  toIata,
  toCityName,
  toCountryName,
  direct,
}: {
  fromIata: string;
  fromCityName: string;
  fromCountryName: string;
  toIata: string;
  toCityName: string;
  toCountryName: string;
  direct: boolean;
}) => {
  return (
    <div className="flightDestinationsContainer">
      <div className="destinationContainer">Destination 1</div>
      <div className="dividerAndDirectContainer">
        <DestinationDivider stops={direct ? 0 : 1} />
        {direct ? (
          <div className="direct">Direct</div>
        ) : (
          <div className="stops">Stops</div>
        )}
      </div>
      <div className="destinationContainer">Destination 2</div>
    </div>
  );
};

// export const FlightDestinations = ({
//   fromIata,
//   fromCityName,
//   fromCountryName,
//   toIata,
//   toCityName,
//   toCountryName,
// }: {
//   fromIata: string;
//   fromCityName: string;
//   fromCountryName: string;
//   toIata: string;
//   toCityName: string;
//   toCountryName: string;
// }) => {
//   return (
//     <Grid item>
//       <Grid
//         container
//         direction="row"
//         justify="space-between"
//         alignItems="baseline"
//         spacing={2}
//       >
//         <Grid item>
//           <Grid container direction="column">
//             <Grid item>
//               <Typography variant="h2" gutterBottom>
//                 {fromIata}
//               </Typography>
//             </Grid>
//             <Grid item xs={3}>
//               <Typography variant="subtitle1">{fromCityName}</Typography>
//             </Grid>
//             <Grid item>
//               <Typography variant="overline">{fromCountryName}</Typography>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item>
//           <div
//             style={{
//               height: '2px',
//               minWidth: '50px',
//               width: '100%',
//               background: '#000000',
//               transform: 'translateY(-10px)',
//             }}
//           />
//         </Grid>
//         <Grid item xs={3}>
//           <Grid container direction="column">
//             <Grid item>
//               <Typography variant="h2" gutterBottom>
//                 {toIata}
//               </Typography>
//             </Grid>
//             <Grid item>
//               <Typography variant="subtitle1">{toCityName}</Typography>
//             </Grid>
//             <Grid item>
//               <Typography variant="overline">{toCountryName}</Typography>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };
