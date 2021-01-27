import React from 'react';
import { Button } from '@material-ui/core';
import querystring from 'querystring';

export const ReferralButton = ({
  origin,
  destination,
  outboundPartialDate,
  associateId,
}: {
  origin: string;
  destination: string;
  outboundPartialDate: string;
  associateId: string;
}) => {
  const params = querystring.stringify({
    origin,
    destination,
    outboundPartialDate,
    associateId,
  });
  const skyscannerReferalEndpoint =
    'https://skyscanner.net/g/referrals/v1/flights/day-view/?';
  const referralURL = `${skyscannerReferalEndpoint}${params}`;
  return (
    <Button
      variant="outlined"
      color="primary"
      style={{ margin: '8px' }}
      onClick={() => {
        const newTab = window.open(referralURL, '_blank');
        newTab?.focus();
      }}
    >
      Get live prices
    </Button>
  );
};
