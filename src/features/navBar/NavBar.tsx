import React from 'react';
import {
  AppBar,
  Button,
  Link,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

export const NavBar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          Lets Go To
        </Typography>
        <nav>
          <Link
            variant="button"
            color="textPrimary"
            href="#"
            className={classes.link}
          >
            Link
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            href="#"
            className={classes.link}
          >
            Link
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            href="#"
            className={classes.link}
          >
            Link
          </Link>
        </nav>
        <Button
          href="#"
          color="primary"
          variant="outlined"
          className={classes.link}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};
