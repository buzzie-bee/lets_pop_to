import { Skeleton } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { fetchLogo } from './fetchLogo';

export const Logo = ({ airlineName }: { airlineName: string }) => {
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchLogo({
      airlineName,
      setLogoUrl,
      setLoading,
    });
  }, []);

  const renderLogo = () => {
    if (loading) {
      return (
        <Skeleton
          variant="rect"
          width={80}
          height={80}
          style={{ marginBottom: '8px' }}
        />
      );
    } else {
      return (
        <img
          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
          alt={`${airlineName} logo`}
          src={logoUrl}
        />
      );
    }
  };

  return <>{renderLogo()}</>;
};
