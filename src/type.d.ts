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
  carrier: CarrierType;
  cost: CostType;
  direct: boolean;
  quotedAt: string;
}

export interface FromType {
  iataCode: string;
  locationName: string;
  cityName: string;
  countryName: string;
  weather: {};
}

export interface ToType {
  iataCode: string;
  locationName: string;
  cityName: string;
  countryName: string;
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
