import React from 'react';

export const WeekdaySelector = ({
  backButton,
}: {
  backButton: JSX.Element;
}) => {
  return (
    <div>
      <div>
        {backButton}
        <p>I am a WeekdaySelector calendar</p>
        <p>I will go here</p>
      </div>
    </div>
  );
};
