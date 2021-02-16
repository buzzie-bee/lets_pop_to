import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Copyright } from '@material-ui/icons';
import SkyScannerLogo from '../../assets/skyscanner-inline--white.svg';
import FlickrLogo from '../../assets/flickrLogo.png';
import { ROUTES } from '../../constants/routes';

export const Footer = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <Grid
          container
          item
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          spacing={4}
        >
          <Grid
            item
            container
            direction="column"
            justify="space-evenly"
            alignItems="flex-start"
            spacing={2}
            sm={4}
            xs={4}
          >
            <Grid item>
              <Typography variant="overline" className={classes.footerLink}>
                Links
              </Typography>
              <List component="nav" aria-label="footer links">
                <ListItem
                  button
                  className={classes.footerLink}
                  onClick={() => {
                    history.push(ROUTES.HOME);
                  }}
                >
                  <ListItemText>Home</ListItemText>
                </ListItem>
                <ListItem
                  button
                  className={classes.footerLink}
                  onClick={() => {
                    history.push(ROUTES.ABOUT);
                  }}
                >
                  <ListItemText>About</ListItemText>
                </ListItem>
              </List>
            </Grid>
            <Grid
              container
              item
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <Copyright className={classes.footerLink} />
              </Grid>
              <Grid item>
                <span className={classes.footerLink}>
                  Copyright 2021{' '}
                  <a
                    href="https://www.tombee.io"
                    target="blank"
                    className={classes.footerLink}
                  >
                    Tom Bee
                  </a>
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            item
            direction="column"
            justify="space-evenly"
            alignItems="flex-start"
            spacing={1}
            sm={6}
            xs={12}
          >
            <Grid item xs={12}>
              <Typography variant="overline" className={classes.footerLink}>
                Credits
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption" className={classes.footerLink}>
                Flight data
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <a href="https://www.skyscanner.net" target="blank">
                <img
                  className={classes.skyscannerLogo}
                  src={SkyScannerLogo}
                  alt={'Powered by skyscanner.net'}
                />
              </a>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" className={classes.footerLink}>
                Destination images sourced from
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <a href="https://www.flickr.com" target="blank">
                <img
                  className={classes.flickrLogo}
                  src={FlickrLogo}
                  alt={'Destination images sourced from Flickr.com'}
                />
              </a>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" className={classes.footerLink}>
                Other images sourced from{' '}
              </Typography>
              <Typography
                variant="caption"
                className={classes.footerLink}
                component="a"
                href="https://www.pexels.com"
              >
                Pexels.com
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="caption"
                className={classes.footerLink}
                component="a"
                href="https://www.pexels.com/photo/photo-of-man-wearing-backpack-while-standing-on-rocks-3326178/"
              >
                Credit: Rahul Pandit
              </Typography>
              <br />
              <Typography
                variant="caption"
                className={classes.footerLink}
                component="a"
                href="https://www.pexels.com/photo/relationship-goals-on-terrace-356808/"
              >
                Credit: Daniel Frank
              </Typography>
              <br />
              <Typography
                variant="caption"
                className={classes.footerLink}
                component="a"
                href="https://www.pexels.com/photo/hands-with-latex-gloves-holding-a-globe-with-a-face-mask-4167544/"
              >
                Credit: Anna Shvets
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: '32px 32px',
    marginTop: '32px',
    background:
      'linear-gradient(90deg, rgba(95,11,136,1) 0%, rgba(153,51,204,1) 50%, rgba(191,83,245,1) 100%)',
    '&.floating': {
      borderRadius: '16px',
    },
  },
  footerLink: {
    color: '#FFFFFF',
  },
  skyscannerLogo: {
    width: '100%',
    height: '55px',
    marginTop: '-16px',
  },
  flickrLogo: {
    maxHeight: '55px',
    width: 'auto',
    marginTop: '8px',
  },
}));
