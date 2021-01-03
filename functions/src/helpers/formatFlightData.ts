import * as functions from 'firebase-functions';
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

    const from = {
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

    const to = {
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

    const departing = quote.outboundLeg.departureDate;

    const carrier = carriers.find(
      (carrier) => carrier.carrierId === quote.outboundLeg.carrierIds[0]
    );

    const cost = {
      cost: quote.minPrice,
      currency: currencies[0].code,
      formatted: formatPrice(quote.minPrice, currencies[0]),
    };

    const direct = quote.direct;

    const quotedAt = quote.quoteDateTime;

    return {
      from,
      to,
      departing,
      carrier,
      cost,
      direct,
      quotedAt,
    };
  });
  // @ts-ignore:
  return { flights: formattedFlightData };
};
