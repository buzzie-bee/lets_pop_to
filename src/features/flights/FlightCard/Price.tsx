import { makeStyles, Typography } from '@material-ui/core';

export const Price = ({ price }: { price: string }) => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.fromTypography}>
        <span className={classes.fromSpan}>From:</span>
      </Typography>
      <Typography className={classes.price}>{price}</Typography>
      <Typography className={classes.priceSub}>.00*</Typography>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  fromTypography: {
    marginTop: '1rem',
  },
  fromSpan: {
    fontWeight: 'lighter',
  },
  price: {
    fontSize: '5rem',
    color: '#9933cc',
    display: 'inline-block',
    marginRight: '0',
    paddingRight: '0',
    lineHeight: '1.0',
  },
  priceSub: {
    fontSize: '2rem',
    color: '#9933cc',
    display: 'inline-block',
    marginLeft: '0',
    paddingLeft: '0',
  },
}));
