import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { formatPrice } from '../../helpers/formatPrice';

export const Flight: React.FC<{ index: number }> = ({ index }) => {
  const { quotes, places, carriers, currencies } = useSelector(
    (state: RootState) => state.flights
  );

  if (!quotes || !places || !carriers || !currencies) {
    return <></>;
  }

  const quote = quotes[index];
  const { minPrice, direct, outboundLeg, inboundLeg, quoteDateTime } = quote;

  const formattedPrice = formatPrice(minPrice, currencies[0]);

  const outboundPlace = places.find(
    (place) => place.placeId === outboundLeg.originId
  );

  const outboundCarrier = carriers.find(
    (carrier) => carrier.carrierId === outboundLeg.carrierIds[0]
  );

  const inboundPlace = places.find(
    (place) => place.placeId === inboundLeg.originId
  );

  const inboundCarrier = carriers.find(
    (carrier) => carrier.carrierId === inboundLeg.carrierIds[0]
  );

  if (quotes) {
    return (
      <div>
        <div>Quoted at: {quoteDateTime}</div>
        <br />
        <div>
          From: {outboundPlace?.iataCode}, {outboundPlace?.name},
          {outboundPlace?.cityName},{outboundPlace?.countryName}
        </div>
        <div>Carrier: {outboundCarrier?.name}</div>
        <div>Departing at: {outboundLeg.departureDate}</div>
        <br />
        <div>
          To: {inboundPlace?.iataCode}, {inboundPlace?.name},
          {inboundPlace?.cityName},{inboundPlace?.countryName}
        </div>
        <div>Carrier: {inboundCarrier?.name}</div>
        <div>Arriving at: {inboundLeg.departureDate}</div>
        <br />
        <div>Cost: {formattedPrice}</div>
        <div>Direct: {direct.toString()}</div>
        {/* <pre>{JSON.stringify(quote, null, 2)}</pre>
        <pre>{JSON.stringify(places, null, 2)}</pre>
        <pre>{JSON.stringify(carriers, null, 2)}</pre>
        <pre>{JSON.stringify(currencies, null, 2)}</pre> */}
      </div>
    );
  } else {
    return null;
  }
};
