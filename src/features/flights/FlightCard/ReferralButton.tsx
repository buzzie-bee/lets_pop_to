import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import querystring from 'querystring';

export const ReferralButton = ({
  origin,
  destination,
  outboundDate,
  associateId,
}: {
  origin: string;
  destination: string;
  outboundDate: string;
  associateId: string;
}) => {
  const classes = useStyles();

  const params = querystring.stringify({
    origin,
    destination,
    outboundDate,
    associateId,
  });
  const skyscannerReferalEndpoint =
    'https://skyscanner.net/g/referrals/v1/flights/day-view/?';
  const referralURL = `${skyscannerReferalEndpoint}${params}`;

  return (
    <Button
      variant="outlined"
      className={classes.referralButton}
      onClick={() => {
        const newTab = window.open(referralURL, '_blank');
        newTab?.focus();
      }}
    >
      Get live prices
    </Button>
  );
};

const useStyles = makeStyles((theme) => ({
  referralButton: {
    margin: '8px',
    color: '#9933cc',
    borderColor: '9933cc',
    border: '1px solid',
  },
}));
