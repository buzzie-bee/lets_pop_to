import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { formatPrice } from '../../helpers/formatPrice';
import { parseTime } from '../../helpers/parseTime';

export const Flight: React.FC<{ index: number }> = ({ index }) => {
  const { quotes, places, carriers, currencies } = useSelector(
    (state: RootState) => state.flights
  );

  if (!quotes || !places || !carriers || !currencies) {
    return <></>;
  }

  const quote = quotes[index];
  const { minPrice, direct, outboundLeg, quoteDateTime } = quote;

  const formattedPrice = formatPrice(minPrice, currencies[0]);

  const outboundFromPlace = places.find(
    (place) => place.placeId === outboundLeg.originId
  );

  const outboundDestinationPlace = places.find(
    (place) => place.placeId === outboundLeg.destinationId
  );

  const outboundInfo = {
    from: {
      iataCode: outboundFromPlace?.iataCode,
      locationName: outboundFromPlace?.name,
      cityName: outboundFromPlace?.cityName,
      countryName: outboundFromPlace?.countryName,
    },
    to: {
      iataCode: outboundDestinationPlace?.iataCode,
      locationName: outboundDestinationPlace?.name,
      cityName: outboundDestinationPlace?.cityName,
      countryName: outboundDestinationPlace?.countryName,
    },
    carrier: carriers.find(
      (carrier) => carrier.carrierId === outboundLeg.carrierIds[0]
    ),
  };

  const formattedLocation = ({ direction }: { direction: string }) => {
    if (direction === 'from' || direction === 'to') {
      const data = direction === 'from' ? outboundInfo.from : outboundInfo.to;
      const { iataCode, locationName, cityName, countryName } = data;

      return `
      ${iataCode},
      ${locationName},
      ${cityName},
      ${countryName},`;
    }

    return '';
  };

  if (quote) {
    return (
      <div>
        <br />
        <div>From: {formattedLocation({ direction: 'from' })}</div>
        <br />
        <div>To: {formattedLocation({ direction: 'to' })}</div>
        <br />
        <div>
          On:{' '}
          {
            parseTime({
              timestamp: outboundLeg.departureDate,
            }).formattedDate
          }
        </div>
        <br />
        <div>Carrier: {outboundInfo?.carrier?.name}</div>
        <div>Cost: {formattedPrice}</div>
        <div>Direct: {direct.toString()}</div>
        <div>
          Quoted price last updated at:{' '}
          {parseTime({ timestamp: quoteDateTime }).formattedDateTime}
        </div>
      </div>
    );
  } else {
    return null;
  }
};
