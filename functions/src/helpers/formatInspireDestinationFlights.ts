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

const getWeather = (outboundDestinationPlace: any, departureDate: any) => {
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

  const flightMonth = parseInt(departureDate.substring(5, 7));

  if (outboundDestinationPlace !== undefined) {
    if (outboundDestinationPlace.iataCode !== undefined) {
      if (outboundDestinationPlace.iataCode in weatherData) {
        if (flightMonth) {
          // @ts-ignore:
          toWeather = weatherData[outboundDestinationPlace?.iataCode][1];
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

  const weather = {
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
  };
  return weather;
};

export const formatInspireDestinationFlights = (
  data: BrowseQuotesType
): FlightsType => {
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

  quotes.push();
  carriers.push();
  currencies.push();

  const formattedDestinationData: any = {};

  quotes.forEach((quote) => {
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

    const to = {
      iataCode: outboundDestinationPlace?.iataCode,
      locationName: outboundDestinationPlace?.name,
      cityName: outboundDestinationPlace?.cityName,
      countryName: outboundDestinationPlace?.countryName,
      weather: {},
    };

    const departing = quote.outboundLeg.departureDate;

    const carrier = carriers.find(
      (carr) => carr.carrierId === quote.outboundLeg.carrierIds[0]
    );

    const cost = {
      cost: quote.minPrice,
      currency: currencies[0].code,
      formatted: formatPrice(quote.minPrice, currencies[0]),
    };

    const direct = quote.direct;

    const quotedAt = quote.quoteDateTime;

    const flightData = {
      from,
      to,
      departing,
      carrier,
      cost,
      direct,
      quotedAt,
    };

    const outboundDestinationId = places.find(
      (place) => place.placeId === quote.outboundLeg.destinationId
    )?.iataCode;

    if (outboundDestinationId) {
      if (outboundDestinationId in formattedDestinationData) {
        if (formattedDestinationData[outboundDestinationId].flights) {
          if (
            Array.isArray(
              formattedDestinationData[outboundDestinationId].flights
            )
          ) {
            formattedDestinationData[outboundDestinationId].flights.push(
              flightData
            );
          }
        }
      } else {
        formattedDestinationData[outboundDestinationId] = {
          place: outboundDestinationPlace,
          weather: getWeather(outboundDestinationPlace, departing),
          flights: [flightData],
          cheapest: 0,
        };
      }
    }
  });

  // @ts-ignore:
  return formattedDestinationData;
};
