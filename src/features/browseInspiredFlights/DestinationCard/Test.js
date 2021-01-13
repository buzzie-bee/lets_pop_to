import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import {
  FiCard,
  FiCardActions,
  FiCardContent,
  FiCardMedia,
} from './FullImageCard';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  /**
   * Max Card with for demo
   * same values used in Material-Ui Card Demos
   */
  card: {
    maxWidth: 400,
  },

  /**
   * Applied to Orginal Card demo
   * Same vale used in Material-ui Card Demos
   */
  media: {
    minHeight: 400,
  },

  /**
   * Demo stlying to inclrease text visibility
   * May verry on implementation
   */
  fiCardContent: {
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,.24)',
  },
  fiCardContentTextSecondary: {
    color: 'rgba(255,255,255,0.78)',
  },
});

export const TestCard = ({ img }) => {
  const classes = useStyles();
  return (
    <FiCard className={classes.card}>
      {/* <FiCardMedia
          media="picture"
          alt="Contemplative Reptile"
          image="/material-ui-lizard.jpg"
          title="Contemplative Reptile"
        /> */}
      <FiCardMedia media="img">{img}</FiCardMedia>
      <FiCardContent className={classes.fiCardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          Lizard
        </Typography>
        <Typography
          variant="body2"
          className={classes.fiCardContentTextSecondary}
          component="p"
        >
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </FiCardContent>
      <FiCardActions className={classes.fiCardContent}>
        <Button size="small" color="inherit" variant="outlined">
          Share
        </Button>
        <Button size="small" color="inherit" variant="outlined">
          Learn More
        </Button>
      </FiCardActions>
    </FiCard>
  );
};
