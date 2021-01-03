export const checkFieldsBrowseQuotes = (query: any) => {
  const {
    country,
    currency,
    locale,
    originPlace,
    destinationPlace,
    outboundPartialDate,
    // inboundPartialDate,
  } = query;

  // TODO: Add further field validation
  // Might be tricky as without a full list of valid codes (not all provided by skyscanner) we might need
  // to rely on errors from their api.

  if (
    country &&
    currency &&
    locale &&
    originPlace &&
    destinationPlace &&
    outboundPartialDate
  ) {
    return true;
  }

  return false;
};
