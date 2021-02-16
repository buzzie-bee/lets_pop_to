import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Link, makeStyles, Toolbar } from '@material-ui/core';
import { ROUTES } from '../../constants/routes';

export const NavBar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" elevation={0} className={classes.appBar}>
      <Toolbar>
        <Link
          component={RouterLink}
          to={ROUTES.HOME}
          variant="h6"
          color="inherit"
          underline="none"
          noWrap
          className={classes.toolbarTitle}
        >
          Lets Pop To
        </Link>

        <nav>
          <Link
            component={RouterLink}
            to={ROUTES.ABOUT}
            variant="button"
            color="textPrimary"
            className={classes.link}
          >
            About
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    background:
      'linear-gradient(90deg, rgba(95,11,136,1) 0%, rgba(153,51,204,1) 50%, rgba(191,83,245,1) 100%)',
    height: '5em',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: '#FFFFFF',
  },
}));
