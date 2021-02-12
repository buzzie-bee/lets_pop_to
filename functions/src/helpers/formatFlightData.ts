import { cameliseKeys } from './cameliseKeys';
import {
  BrowseQuotesType,
  CarrierType,
  CurrencyType,
  FlightsType,
  PlaceType,
  QuoteType,
} from '../types';
import { formatPrice } from './formatPrice';

import * as weatherData from '../airport_weather.json';

export const formatFlightData = (data: BrowseQuotesType): FlightsType => {
  const {
    quotes,
    places,
    carriers,
    currencies,
  }: {
    quotes: QuoteType[];
    places: PlaceType[];
    carriers: CarrierType[];
    currencies: CurrencyType[];
  } = cameliseKeys(data);

  const formattedFlightData = quotes.map((quote) => {
    const outboundFromPlace = places.find(
      (place) => place.placeId === quote.outboundLeg.originId
    );

    const outboundDestinationPlace = places.find(
      (place) => place.placeId === quote.outboundLeg.destinationId
    );

    const outboundFrom = {
      iataCode: outboundFromPlace?.iataCode,
      locationName: outboundFromPlace?.name,
      cityName: outboundFromPlace?.cityName,
      countryName: outboundFromPlace?.countryName,
      weather: {},
    };

    let toWeather = {
      tavg: undefined,
      tmin: undefined,
      tmax: undefined,
      precipitation: undefined,
      windDirection: undefined,
      windSpeed: undefined,
      windPeakGust: undefined,
      pressure: undefined,
      sunlightHours: undefined,
      sunlightMinutes: undefined,
    };

    const flightMonth = parseInt(
      quote.outboundLeg.departureDate.substring(5, 7)
    );

    if (outboundFromPlace !== undefined) {
      if (outboundFromPlace.iataCode !== undefined) {
        if (outboundFromPlace.iataCode in weatherData) {
          if (flightMonth) {
            // @ts-ignore:
            toWeather = weatherData[outboundFromPlace?.iataCode][1];
          }
        }
      }
    }

    const {
      tavg,
      tmin,
      tmax,
      precipitation,
      windDirection,
      windSpeed,
      windPeakGust,
      pressure,
      sunlightHours,
      sunlightMinutes,
    } = toWeather;

    const outboundTo = {
      iataCode: outboundDestinationPlace?.iataCode,
      locationName: outboundDestinationPlace?.name,
      cityName: outboundDestinationPlace?.cityName,
      countryName: outboundDestinationPlace?.countryName,
      weather: {
        tavg,
        tmin,
        tmax,
        precipitation,
        windDirection,
        windSpeed,
        windPeakGust,
        pressure,
        sunlightHours,
        sunlightMinutes,
      },
    };

    const outboundDeparting = quote.outboundLeg.departureDate;

    const outboundCarrier = carriers.find(
      (carr) => carr.carrierId === quote.outboundLeg.carrierIds[0]
    );

    let inboundFrom = undefined;
    let inboundTo = undefined;
    let inboundDeparting = undefined;
    let inboundCarrier = undefined;
    if (quote.inboundLeg) {
      const inboundFromPlace = places.find(
        (place) => place.placeId === quote.inboundLeg.originId
      );

      const inboundDestinationPlace = places.find(
        (place) => place.placeId === quote.inboundLeg.destinationId
      );

      inboundFrom = {
        iataCode: inboundFromPlace?.iataCode,
        locationName: inboundFromPlace?.name,
        cityName: inboundFromPlace?.cityName,
        countryName: inboundFromPlace?.countryName,
        weather: {},
      };

      inboundTo = {
        iataCode: inboundDestinationPlace?.iataCode,
        locationName: inboundDestinationPlace?.name,
        cityName: inboundDestinationPlace?.cityName,
        countryName: inboundDestinationPlace?.countryName,
        weather: {},
      };

      inboundDeparting = quote.inboundLeg.departureDate;

      inboundCarrier = carriers.find(
        (carr) => carr.carrierId === quote.inboundLeg.carrierIds[0]
      );
    }

    // Shared data for both legs
    const cost = {
      cost: quote.minPrice,
      currency: currencies[0].code,
      formatted: formatPrice(quote.minPrice, currencies[0]),
    };

    const direct = quote.direct;

    const quotedAt = quote.quoteDateTime;

    return {
      outbound: {
        from: outboundFrom,
        to: outboundTo,
        departing: outboundDeparting,
        carrier: outboundCarrier,
      },
      inbound: {
        from: inboundFrom,
        to: inboundTo,
        departing: inboundDeparting,
        carrier: inboundCarrier,
      },
      cost,
      direct,
      quotedAt,
    };
  });
  // @ts-ignore:
  return { flights: formattedFlightData };
};
