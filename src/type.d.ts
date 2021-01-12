export interface FlightsType {
  loaded: boolean;
  loading: boolean;
  error: boolean;
  errorMessage: string;
  flights: Flight[];
}

export interface FlightType {
  from: FromType;
  to: ToType;
  departing: string;
  carrier: CarrierType;
  cost: CostType;
  direct: boolean;
  quotedAt: string;
}

export interface FromType {
  iataCode: string;
  locationName: string;
<<<<<<< HEAD
  cityName: string;
  countryName: string;
  weather: {};
}

export interface ToType {
  iataCode: string;
  locationName: string;
  cityName: string;
  countryName: string;
=======
  cityName: string;
  countryName: string;
  weather: {};
}

export interface ToType {
  iataCode: string;
  locationName: string;
  cityName: string;
  countryName: string;
>>>>>>> e8d08dd6f092a8c522901988b1c48782d8b33b40
  weather: WeatherType;
}

export interface WeatherType {
  tavg: number | null;
  tmin: number | null;
  tmax: number | null;
  precipitation: number | null;
  windDirection: number | null;
  windSpeed: number | null;
  windPeakGust: number | null;
  pressure: number | null;
  sunlightHours: number | null;
  sunlightMinutes: number | null;
}

export interface CarrierType {
  carrierId: number;
  name: string;
}

export interface CostType {
  cost: number;
  currency: string;
  formatted: string;
}

export interface FetchBrowseFlightsParams {
  country: string;
  currency: string;
  locale: string;
  originPlace: string;
  destinationPlace: string;
  outboundPartialDate: string;
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

export interface PlaceOptionType {
  placeId: string;
  placeName: string;
  countryId: string;
  regionId: string;
  cityId: string;
  countryName: string;
}

export interface InspireMeStateType {
  from: PlaceOptionType | null;
  dates: string[];
}
