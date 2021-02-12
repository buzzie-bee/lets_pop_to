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

    const outboundFrom = {
      iataCode: outboundFromPlace?.iataCode,
      locationName: outboundFromPlace?.name,
      cityName: outboundFromPlace?.cityName,
      countryName: outboundFromPlace?.countryName,
      weather: {},
    };

    const outboundTo = {
      iataCode: outboundDestinationPlace?.iataCode,
      locationName: outboundDestinationPlace?.name,
      cityName: outboundDestinationPlace?.cityName,
      countryName: outboundDestinationPlace?.countryName,
      weather: {},
    };

    const outboundDeparting = quote.outboundLeg.departureDate;

    const outboundCarrier = carriers.find(
      (carr) => carr.carrierId === quote.outboundLeg.carrierIds[0]
    );

    let inboundFrom = undefined;
    let inboundTo = undefined;
    let inboundDeparting = undefined;
    let inboundCarrier = undefined;
    // Do the same normalisation for return legs if they exist
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

    // Cost, direct, quotedAt applies to both legs of journey
    const cost = {
      cost: quote.minPrice,
      currency: currencies[0].code,
      formatted: formatPrice(quote.minPrice, currencies[0]),
    };

    const direct = quote.direct;

    const quotedAt = quote.quoteDateTime;

    const flightData = {
      outbound: {
        from: outboundFrom,
        to: outboundTo,
        departing: outboundDeparting,
        carrier: outboundCarrier,
        quotedAt,
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
          weather: getWeather(outboundDestinationPlace, outboundDeparting),
          flights: [flightData],
          cheapest: 0,
        };
      }
    }
  });

  // @ts-ignore:
  return formattedDestinationData;
};
