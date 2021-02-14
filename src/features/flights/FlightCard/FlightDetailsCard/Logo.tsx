import React, { useEffect, useState } from 'react';
import { Skeleton } from '@material-ui/lab';

import { fetchLogo } from './fetchLogo';
import { makeStyles } from '@material-ui/core';

export const Logo = ({ airlineName }: { airlineName: string }) => {
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const classes = useStyles();

  useEffect(() => {
    fetchLogo({
      airlineName,
      setLogoUrl,
      setLoading,
    });
  }, [airlineName]);

  const renderLogo = () => {
    if (loading) {
      return (
        <Skeleton
          variant="rect"
          width={80}
          height={80}
          className={classes.placeholder}
        />
      );
    } else {
      return (
        <img
          className={classes.logo}
          alt={`${airlineName} logo`}
          src={logoUrl}
        />
      );
    }
  };

  return <>{renderLogo()}</>;
};

const useStyles = makeStyles((theme) => ({
  logo: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
  },
  placeholder: {
    marginBottom: '8px',
  },
}));
