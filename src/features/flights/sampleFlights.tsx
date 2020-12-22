export const sampleFlights = {
  Quotes: [
    {
      QuoteId: 1,
      MinPrice: 336,
      Direct: true,
      OutboundLeg: {
        CarrierIds: [1864],
        OriginId: 81727,
        DestinationId: 60987,
        DepartureDate: '2018-04-01T00:00:00',
      },
      InboundLeg: {
        CarrierIds: [851],
        OriginId: 60987,
        DestinationId: 81727,
        DepartureDate: '2018-05-01T00:00:00',
      },
      QuoteDateTime: '2018-03-08T04:54:00',
    },
  ],
  Places: [
    {
      PlaceId: 60987,
      IataCode: 'JFK',
      Name: 'New York John F. Kennedy',
      Type: 'Station',
      SkyscannerCode: 'JFK',
      CityName: 'New York',
      CityId: 'NYCA',
      CountryName: 'United States',
    },
    {
      PlaceId: 81727,
      IataCode: 'SFO',
      Name: 'San Francisco International',
      Type: 'Station',
      SkyscannerCode: 'SFO',
      CityName: 'San Francisco',
      CityId: 'SFOA',
      CountryName: 'United States',
    },
  ],
  Carriers: [
    {
      CarrierId: 851,
      Name: 'Alaska Airlines',
    },
    {
      CarrierId: 870,
      Name: 'jetBlue',
    },
    {
      CarrierId: 1721,
      Name: 'Sun Country Airlines',
    },
    {
      CarrierId: 1864,
      Name: 'Virgin America',
    },
  ],
  Currencies: [
    {
      Code: 'USD',
      Symbol: '$',
      ThousandsSeparator: ',',
      DecimalSeparator: '.',
      SymbolOnLeft: true,
      SpaceBetweenAmountAndSymbol: false,
      RoundingCoefficient: 0,
      DecimalDigits: 2,
    },
  ],
};
