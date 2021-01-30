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
      return <div>Loading</div>;
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
