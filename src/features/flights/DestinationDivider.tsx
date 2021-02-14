import { makeStyles } from '@material-ui/core';

export const DestinationDivider = ({ stops }: { stops: number }) => {
  const classes = useStyles();

  const renderStops = () => {
    if (stops === 0) {
      return;
    } else if (stops === 1) {
      return <div className={classes.dividerStop} />;
    } else if (stops === 2) {
      return (
        <>
          <div className={`${classes.dividerStop} ${classes.d33}`} />
          <div className={`${classes.dividerStop} ${classes.d66}`} />
        </>
      );
    }
  };

  return (
    <div className={classes.destinationDivider}>
      <div className={classes.dividerStart} />
      {renderStops()}
      <div className={classes.dividerEnd} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  destinationDivider: {
    position: 'relative',
    display: 'block',
    height: '2px',
    marginTop: '20px',
    marginLeft: '50px',
    marginRight: '60px',
    width: '80%',
    borderTop: '2px dashed #9933cc',
  },
  dividerStart: {
    display: 'block',
    position: 'absolute',
    left: '-6px',
    top: '-6px',
    height: '12px',
    width: '12px',
    background: '#9933cc',
    borderRadius: '50%',
  },
  dividerStop: {
    display: 'block',
    position: 'absolute',
    left: '50%',
    marginLeft: '-6px',
    top: '-6px',
    height: '12px',
    width: '12px',
    background: '#cf0000',
    borderRadius: '50%',
  },
  d33: {
    left: '33%',
  },
  d66: {
    left: '66%',
  },
  dividerEnd: {
    display: 'block',
    position: 'absolute',
    right: '-6px',
    top: '-6px',
    height: '12px',
    width: '12px',
    background: '#9933cc',
    borderRadius: '50%',
  },
}));
