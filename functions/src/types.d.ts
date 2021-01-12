interface FlightDataType {
  from: {
    iataCode: string;
    locationName: string | undefined;
    cityName: string | undefined;
    countryName: string | undefined;
    weather: {};
  };
  to: {
    iataCode: string | undefined;
    locationName: string | undefined;
    cityName: string | undefined;
    countryName: string | undefined;
    weather: {
      tavg: number | undefined | null;
      tmin: number | undefined | null;
      tmax: number | undefined | null;
      precipitation: number | undefined | null;
      windDirection: number | undefined | null;
      windSpeed: number | undefined | null;
      windPeakGust: number | undefined | null;
      pressure: number | undefined | null;
      sunlightHours: number | undefined | null;
      sunlightMinutes: number | undefined | null;
    };
  };
  departing: string | undefined;
  carrier: CarrierType | undefined;
  cost: {
    cost: number | undefined;
    currency: string | undefined;
    formatted: string | undefined;
  };
  direct: boolean | undefined;
  quotedAt: string | undefined;
}

interface FlightsType {
  flights: FlightDataType[];
}

export interface BrowseQuotesType {
  quotes: QuoteType[];
  places: PlaceType[];
  carriers: CarrierType[];
  currencies: CurrencyType[];
}

export interface QuoteType {
  quoteId: number;
  minPrice: number;
  direct: boolean;
  outboundLeg: {
    carrierIds: number[];
    originId: number;
    destinationId: number;
    departureDate: string;
  };
  inboundLeg: {
    carrierIds: number[];
    originId: number;
    destinationId: number;
    departureDate: string;
  };
  quoteDateTime: string;
}

export interface PlaceType {
  placeId: number;
  iataCode: string;
  name: string;
  type: string;
  skyscannerCode: string;
  cityName: string;
  cityId: string;
  countryName: string;
}

export interface CarrierType {
  carrierId: number;
  name: string;
}

export interface CurrencyType {
  code: string;
  symbol: string;
  thousandsSeparator: string;
  decimalSeparator: string;
  symbolOnLeft: boolean;
  spaceBetweenAmountAndSymbol: boolean;
  roundingCoefficient: number;
  decimalDigits: number;
}
<<<<<<< HEAD

export interface AutoSuggestPlaces {
  places: AutoSuggestPlace[];
}

export interface AutoSuggestPlace {
  placeId: string;
  placeName: string;
  countryId: string;
  regionId: string;
  cityId: string;
  countryName: string;
}

export interface PlaceOptionType {
  placeId: string;
  placeName: string;
  countryId: string;
  regionId: string;
  cityId: string;
  countryName: string;
}

export interface InspireMeQueryType {
  from: PlaceOptionType | null;
  dates: string[];
}
=======
>>>>>>> e8d08dd6f092a8c522901988b1c48782d8b33b40
