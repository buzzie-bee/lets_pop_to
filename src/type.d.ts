export interface FlightsType {
  quotes: QuoteType[] | null;
  places: PlaceType[] | null;
  carriers: CarrierType[] | null;
  currencies: CurrencyType[] | null;
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
