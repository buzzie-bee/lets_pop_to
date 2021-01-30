import React from 'react';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './BackButton.css';

interface BackButtonProps {
  setComponent: (component: string) => void;
  history: string[];
  setHistory: (history: string[]) => void;
}

export const BackButton = ({
  setComponent,
  history,
  setHistory,
}: BackButtonProps) => {
  const goBack = () => {
    const prevPage = history[history.length - 2];
    setHistory([...history.slice(0, history.length - 2)]);
    setComponent(prevPage);
    console.log(history);
    console.log(prevPage);
  };

  return (
    <div className="backButtonContainer">
      <IconButton aria-label="arrow-back-icon" onClick={goBack}>
        <ArrowBackIcon />
      </IconButton>
    </div>
  );
};
