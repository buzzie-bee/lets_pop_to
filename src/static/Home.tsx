import React from 'react';
import {
  Container,
  makeStyles,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { InspireMe } from '../features/inspireMe/InspireMe';

export const Home = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:630px)');
  const tiny = useMediaQuery('(max-width:400px)');

  return (
    <div>
      <div className={classes.heroContainer}>
        <img
          className={classes.heroImage}
          alt="Man staring across lake - by Rahul Pandit from Pexels "
          src="https://firebasestorage.googleapis.com/v0/b/lets-pop-to-dev.appspot.com/o/static%2Frahul_looking_md.jpg?alt=media&token=6e3b3030-3c60-459f-9ca8-090a34b1574c"
        />

        <Typography variant={!tiny ? 'h1' : 'h2'} className={classes.heroText}>
          Where will <u>you</u> pop to next?
        </Typography>
        {matches && (
          <div className={classes.heroInspire}>
            <InspireMe floating={true} />
          </div>
        )}
      </div>
      {!matches && <InspireMe floating={false} />}
      <Container maxWidth="md">
        <Typography variant="h1">Home Page</Typography>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    position: 'relative',
    marginBottom: '-6px',
  },
  heroImage: {
    width: '100%',
    minHeight: '600px',
    maxHeight: '800px',
    objectFit: 'cover',
  },
  heroInspire: {
    position: 'absolute',
    bottom: '16px',
    left: '10%',
    width: '80%',
    '@media (min-width: 1000px)': {
      bottom: '20%',
      maxWidth: '800px',
      left: '50%',
      transform: 'translateX(-400px)',
    },
  },
  heroText: {
    position: 'absolute',
    top: '15%',
    left: '16px',
    color: '#FFF',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: '16px',
    padding: '8px',
  },
  bodyContent: {
    marginTop: '4rem',
    marginBottom: '4rem',
  },
  title1: {
    color: '#9933cc',
    fontWeight: 400,
  },
  dividerBlock: {
    position: 'relative',
    width: '100%',
    minHeight: '500px',
    backgroundColor: '#D2D6EF',
    padding: '16px',
  },
  dividerBlock2: {
    position: 'relative',
    width: '100%',
    minHeight: '500px',
    backgroundColor: '#FFA62B',
    padding: '16px',
  },
  dividerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    flexBasis: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  dividerText: {
    color: '#FFF',
    padding: '16px',
    fontWeight: 400,
  },
}));
