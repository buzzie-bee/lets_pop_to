import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Hidden,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { InspireMe } from '../../features/inspireMe/InspireMe';
import { CalendarCarousel } from './CalendarCarousel';
import { ROUTES } from '../../constants/routes';

export const Home = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:630px)');
  const tiny = useMediaQuery('(max-width:400px)');

  const inspireRef = useRef<HTMLDivElement>(null);

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
          <div ref={inspireRef} className={classes.heroInspire}>
            <InspireMe floating={true} />
          </div>
        )}
      </div>
      {!matches && (
        <div ref={inspireRef}>
          <InspireMe floating={false} />
        </div>
      )}

      <div className={classes.bodyContent}>
        <Container maxWidth="md" className={classes.bodyContent}>
          <Paper className={classes.headerPaper}>
            <Grid
              container
              item
              direction="row"
              justify="space-around"
              alignItems="center"
              spacing={2}
            >
              <Hidden xsDown>
                <Grid item sm={3}>
                  <img
                    className={classes.covidImage}
                    alt="covid globe with mask on"
                    src="https://firebasestorage.googleapis.com/v0/b/lets-pop-to-dev.appspot.com/o/static%2FcoronaGlobe.jpg?alt=media&token=ce0a05c8-e2c4-476b-87c8-5240df946c79"
                  />
                </Grid>
              </Hidden>

              <Grid
                item
                container
                direction="column"
                justify="space-evenly"
                alignItems="stretch"
                sm={9}
                xs={12}
              >
                <Grid item xs={12}>
                  <Typography variant="h4">
                    Check travel restrictions before booking
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <div className={classes.centerFloatedButtonContainer}>
                    <Button
                      onClick={() => {
                        const newTab = window.open(
                          'https://www.skyscanner.net/travel-restrictions',
                          '_blank'
                        );
                        newTab?.focus();
                      }}
                    >
                      Find out more
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Container>
        <div className={classes.dividerBlock}>
          <div className={classes.dividerContent}>
            <Typography variant="h2" className={classes.dividerText}>
              Find <u>your</u> dream destination
            </Typography>
          </div>
        </div>
        <Container maxWidth="md" className={classes.bodyContent}>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
            spacing={4}
          >
            <Grid item md={6} xs={12}>
              <Typography variant="h2" className={classes.title1}>
                Inspire your wanderlust
              </Typography>
              <br />
              <Typography variant="body1">
                We do the heavy lifting to find the best flights for your given
                dates so you can focus on where you can go on your next
                adventure.
              </Typography>
              <br />
            </Grid>
            <Grid item md={6} xs={12}>
              <div className={classes.destinationsImageContainer}>
                <img
                  className={classes.destinationImages}
                  alt="example of destination cards"
                  src="https://firebasestorage.googleapis.com/v0/b/lets-pop-to-dev.appspot.com/o/static%2FdestinationOptionsCompressed.png?alt=media&token=17371317-63c0-44a0-875d-8bf85be24814"
                />
                <Typography variant="caption">
                  Be inspired by our beautiful destination search results
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={classes.dividerBlock2}>
        <div className={classes.dividerContent}>
          <Typography variant="h2" className={classes.dividerText}>
            Work to <u>your</u> schedule
          </Typography>
        </div>
      </div>
      <Container maxWidth="md" className={classes.bodyContent}>
        <Grid
          container
          direction="row-reverse"
          justify="space-evenly"
          alignItems="flex-start"
          spacing={4}
        >
          <Grid item md={6} xs={12}>
            <Typography variant="h2" className={classes.title1}>
              Make the world rotate around you
            </Typography>
            <br />
            <Typography variant="body1">
              Our simple yet powerful date selector tools let you choose the
              dates that work best for you.
            </Typography>
            <br />
            <Typography variant="body1">
              Choose from 3 different date pickers. <b>Normal</b>,{' '}
              <b>Advanced</b>, and <b>Weekdays</b>.
            </Typography>
            <br />
            <Typography variant="body1">
              <b>Normal</b> lets you choose a departure and return date for when
              you know exactly when you want to travel.
            </Typography>
            <br />
            <Typography variant="body1">
              <b>Advanced</b> lets you define multiple departure and return
              dates for when you want maximum control.
            </Typography>
            <br />
            <Typography variant="body1">
              <b>Weekdays</b> lets you pick departure and return days of the
              week, and the months you want to travel in. For when you fancy a
              weekend break or want to minimise the use of your holiday days.
            </Typography>
            <br />
          </Grid>
          <Grid item md={6} xs={12}>
            <div className={classes.destinationsImageContainer}>
              <CalendarCarousel />
              <Typography variant="caption">
                Have full control over your trip dates
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
      <div className={classes.dividerBlock3}>
        <div className={classes.dividerContent}>
          <Typography variant="h2" className={classes.dividerText}>
            Sounds great?
          </Typography>
        </div>
      </div>
      <Container maxWidth="md" className={classes.bodyContent}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
          spacing={4}
        >
          <Grid item md={6} xs={12}>
            <Typography variant="h2" className={classes.title1}>
              Go explore
            </Typography>
            <br />
            <Typography variant="body1">
              Enter a departure location, pick you dates, and go be inspired!
            </Typography>
            <br />
          </Grid>
          <Grid item md={6} xs={12}>
            <Grid
              container
              item
              direction="column"
              justify="center"
              alignItems="center"
              spacing={4}
            >
              <Grid item>
                <Button
                  size="large"
                  className={classes.inspireMeButton}
                  onClick={() => {
                    const inspireMePosition = inspireRef.current
                      ? inspireRef.current.scrollHeight
                      : 0;
                    window.scrollTo({
                      top: inspireMePosition,
                      left: 0,
                      behavior: 'smooth',
                    });
                  }}
                >
                  Get inspired
                </Button>
              </Grid>
              <Grid item>Or</Grid>
              <Grid item>
                <Button
                  component={Link}
                  to={ROUTES.ABOUT}
                  size="large"
                  className={classes.inspireMeButton}
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  Find out more
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <div className={classes.endOfPagePadding} />
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
  headerPaper: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '32px',
    paddingBottom: '32px',
    color: '#FFF',
    width: '100%',
    borderRadius: '16px',
    backgroundColor: '#FFA62B',
  },
  centerFloatedButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '32px',
  },
  covidImage: {
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'cover',
    borderRadius: '16px',
    marginLeft: '8px',
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
  dividerBlock3: {
    position: 'relative',
    width: '100%',
    minHeight: '500px',
    backgroundColor: '#82FF9E',
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
  destinationsImageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
  },
  destinationImages: {
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'cover',
    borderRadius: '16px',
  },
  inspireMeButton: {
    backgroundColor: '#9933cc',
    color: '#FFFFFF',
    boxShadow:
      '0px 3px 1px -2px rgba(153, 51, 204, 0.25),0px 2px 2px 0px rgba(153, 51, 204, 0.25),0px 1px 5px 0px rgba(153, 51, 204, 0.25);',
    '&:hover': {
      backgroundColor: '#9933ccAA',
    },
  },
  endOfPagePadding: {
    height: '50px',
  },
}));
