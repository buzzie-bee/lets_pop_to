import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

export const About = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.heroContainer}>
        <img
          className={classes.heroImage}
          alt="Man staring across lake - by Rahul Pandit from Pexels "
          src="https://firebasestorage.googleapis.com/v0/b/lets-pop-to-dev.appspot.com/o/static%2Frahul_looking_md.jpg?alt=media&token=6e3b3030-3c60-459f-9ca8-090a34b1574c"
        />

        <Typography variant="h1" className={classes.heroText}>
          Where will <u>you</u> pop to next?
        </Typography>
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
              Find{' '}
              <b>
                <u>your</u>
              </b>{' '}
              destination
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="body1">
              Let's Pop To is an inspirational flight finding tool created to
              make finding your next holiday destination easier than ever.
            </Typography>
            <br />

            <Typography variant="body1">
              Powered by the Skyscanner API we can search for flights from
              almost anywhere across the Earth to help inspire your next
              adventure.
            </Typography>
            <br />
            <Typography variant="body1">
              With our intuitive date selection tools you can now search for
              flights that work around your schedule.
            </Typography>
            <br />
            <Typography variant="body1">
              Traditionally a search for 'Show me where I can go if I depart on
              a Friday, return on a Sunday anytime in June' involved a lot of
              browser tabs and frustration.
            </Typography>
            <br />
            <Typography variant="body1">
              Let's Pop To extends the flight finding paradigm by letting YOU
              choose the dates that work for you whilst we inspire you with
              enticing destinations.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <div className={classes.dividerBlock}>
        <div className={classes.dividerContent}>
          <Typography variant="h2" className={classes.dividerText}>
            Focus on <i>where</i> to go next
          </Typography>
          <Typography variant="h3" className={classes.dividerText}>
            not how to get there
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
              Just say{' '}
              <b>
                <u>when</u>
              </b>
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="body1">
              You tell us when you can go and we'll do the hard work of trawling
              through flight records to find the perfect match for your
              schedule.
            </Typography>
            <br />
            <Typography variant="body1">
              Have you ever tried searching for flights in June and been shown
              an amazing price for your ideal destination, only to find out it
              departs on a 4am on a Tuesday and has a 14 hour layover?
            </Typography>
            <br />
            <Typography variant="body1">
              We let YOU choose the dates instead so you can concentrate on
              finding your ideal destination.
            </Typography>
            <br />
          </Grid>
        </Grid>
      </Container>
      <div className={classes.dividerBlock2}>
        <div className={classes.dividerContent}>
          <Typography variant="h3" className={classes.dividerText}>
            <i>
              "Of all the books in the world. The best stories are found between
              the pages of a passport."
            </i>
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
              Develped with ❤️
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="body1">
              This site was developed by Tom Bee.
            </Typography>
            <br />
            <Typography variant="body1">
              You can find out about more of his projects at{' '}
              <a href="https://www.tombee.io" target="blank">
                www.tombee.io
              </a>
            </Typography>
            <br />
            <Typography variant="body1">
              Got any questions or feedback? Let Tom know! He'd love for you to
              reach out.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    minHeight: '600px',
    objectFit: 'cover',
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
