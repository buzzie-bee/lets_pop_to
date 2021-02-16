import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, makeStyles, Paper, useMediaQuery } from '@material-ui/core';

import { SelectNewDates } from './SelectNewDates/SelectNewDates';
import { PlaceInput } from './PlaceInput';

import { InspireMeStateType, PlaceOptionType } from '../../type';
import { RootState } from '../../redux/store';

import { setFrom } from './slice/inspireMeSlice';
import { initialiseFilters } from '../browseInspiredFlights/Filters/filtersSlice';
import { ROUTES } from '../../constants/routes';
import { TripType } from './TripType';

export const InspireMe = ({ floating }: { floating: boolean }) => {
  const { tripType }: InspireMeStateType = useSelector(
    (state: RootState) => state.inspireMe
  );
  const { from, dates }: InspireMeStateType = useSelector(
    (state: RootState) => state.inspireMe
  );
  const [valid, setValid] = useState<boolean>(false);

  const dispatch = useDispatch();
  const classes = useStyles();
  const desktop = useMediaQuery('(min-width:1000px)', { noSsr: true });
  const mobile = useMediaQuery('(min-width: 460px)', { noSsr: true });
  const tiny = useMediaQuery('(max-width:350px)', { noSsr: true });

  const checkValid = useCallback((): boolean => {
    if (from) {
      if (dates.length) {
        if (dates[0].outbound) {
          if (tripType) {
            return true;
          }
        }
      }
    }
    return false;
  }, [dates, from, tripType]);

  const handleSetFrom = (from: PlaceOptionType): void => {
    dispatch(setFrom(from));
  };

  useEffect(() => {
    setValid(checkValid());
  }, [from, dates, checkValid]);

  return (
    <Paper
      elevation={floating ? 1 : 0}
      className={`${classes.paperContainer} ${floating ? 'floating' : ''}`}
    >
      <Paper className={classes.optionsContainer}>
        <div className={classes.selectorsContainerColumn}>
          {desktop && (
            <div className={classes.selectorsContainerRow}>
              <div>
                <PlaceInput handleSetFrom={handleSetFrom} />
              </div>
              <div>
                <TripType large={true} />
              </div>
              <div>
                <SelectNewDates
                  tripType={tripType}
                  disabled={tripType.length === 0}
                  large={true}
                />
              </div>
            </div>
          )}
          {!desktop && !tiny && (
            <>
              <div className={classes.mobileOptionsColumn}>
                <div>
                  <PlaceInput handleSetFrom={handleSetFrom} />
                </div>
                <div className={classes.mobileOptionsRow}>
                  <div>
                    <TripType large={mobile} />
                  </div>
                  <div>
                    <SelectNewDates
                      tripType={tripType}
                      disabled={tripType.length === 0}
                      large={mobile}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          {tiny && (
            <>
              <div className={classes.mobileOptionsColumn}>
                <div>
                  <PlaceInput handleSetFrom={handleSetFrom} />
                </div>
                <div className={classes.mobileOptionsRow}>
                  <div>
                    <TripType large={false} />
                  </div>
                </div>
                <div className={classes.mobileOptionsRow}>
                  <div>
                    <SelectNewDates
                      tripType={tripType}
                      disabled={tripType.length === 0}
                      large={false}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <div className={classes.inspireButtonRow}>
            <Button
              className={classes.inspireButton}
              variant="contained"
              size="large"
              disabled={!valid}
              component={Link}
              to={`${ROUTES.INSPIRATION_PREFIX}/${JSON.stringify(
                from
              )}/${JSON.stringify(dates)}`}
              onClick={() => {
                dispatch(initialiseFilters());
              }}
            >
              Inspire Me
            </Button>
          </div>
        </div>
      </Paper>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderRadius: '0px',
    background:
      'linear-gradient(90deg, rgba(95,11,136,1) 0%, rgba(153,51,204,1) 50%, rgba(191,83,245,1) 100%)',
    '&.floating': {
      borderRadius: '16px',
    },
  },
  optionsContainer: {
    color: theme.palette.text.secondary,
    backgroundColor: '#FFF',
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    borderRadius: '16px',
  },
  inspireButton: {
    backgroundColor: '#9933cc',
    color: '#FFFFFF',
    boxShadow:
      '0px 3px 1px -2px rgba(153, 51, 204, 0.25),0px 2px 2px 0px rgba(153, 51, 204, 0.25),0px 1px 5px 0px rgba(153, 51, 204, 0.25);',
    '&:hover': {
      backgroundColor: '#9933ccAA',
    },
  },
  selectorsContainerColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  selectorsContainerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inspireButtonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  mobileOptionsColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  mobileOptionsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '16px',
    marginBottom: '16px',
  },
}));
