export interface SortedByPriceDestinationType {
  destination: string;
  cost: number;
}

export interface FlightDestinationsType {
  [key: string]: FlightDestinationDataType;
}

export interface FlightDestinationDataType {
  place: PlaceDataType;
  weather: WeatherType;
  flights: FlightType[];
  cheapest: number;
}

export interface PlaceDataType {
  name: string;
  type: string;
  placeId: number;
  iataCode: string;
  skyscannerCode: string;
  cityName: string;
  cityId: string;
  countryName: string;
}

export interface FlightLegType {
  from: FromType;
  to: ToType;
  departing: string;
  carrier: CarrierType;
}

export interface FlightType {
  outbound: FlightLegType;
  inbound: FlightLegType;
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

export interface PlaceOptionType {
  placeId: string;
  placeName: string;
  countryId: string;
  regionId: string;
  cityId: string;
  countryName: string;
}

export interface DateType {
  outbound: string;
  inbound: string;
}

export type SelectorType = 'Normal' | 'Weekdays' | 'Advanced';

export interface InspireMeStateType {
  from: PlaceOptionType | null;
  dates: DateType[];
  tripType: '' | 'oneWay' | 'return';
  selectorType: SelectorType;
  weekdaySelections: SelectionsType;
  durationRange: number[];
  months: MonthType[];
}

export interface WeekdayType {
  weekday:
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday';
  selected: boolean;
}

export interface MonthType {
  // TODO: find a better way to say a number between range, or a number with x characters
  name: string;
  month: string;
  year: string;
  selected: boolean;
}

interface SelectionsType {
  outbound: WeekdayType[];
  inbound: WeekdayType[];
  months: MonthType[];
}
