import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Chip,
  IconButton,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import clsx from 'clsx';

import { DateType } from '../../../../../type';
import { setNewDates } from '../../../inspireMeSlice';

export const SpecificDatesCalendar = ({
  tripType,
  closePopup,
}: {
  tripType: '' | 'oneWay' | 'return';
  closePopup: () => void;
}) => {
  const [dates, setDates] = useState<DateType[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [returnMode, setReturnMode] = useState<boolean>(false);
  const [settingDate, setSettingDate] = useState<string | null>(null);

  const classes = useStyles();
  const dispatch = useDispatch();

  const normalisedDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const dateString = `${year}-${month < 10 ? `0${month}` : month}-${day}`;
    return dateString;
  };

  const handleChange = (newDate: Date | null) => {
    if (!newDate) {
      return;
    }

    const newDateNormalised = new Date(newDate.toUTCString());
    const newDateString = normalisedDateString(newDateNormalised);
    setSelectedDate(newDateNormalised);

    if (!returnMode) {
      if (dates.find((date) => date.outbound === newDateString)) {
        setDates((dates) =>
          dates.filter((date) => date.outbound !== newDateString)
        );
      } else {
        setDates((dates) => [
          ...dates,
          { outbound: newDateString, inbound: '' },
        ]);
      }
    } else if (settingDate) {
      const alreadyExists = dates.findIndex(
        (date) =>
          date.outbound === settingDate && date.inbound === newDateString
      );
      if (alreadyExists !== -1) {
        if (
          dates.filter((date) => date.outbound === settingDate).length === 1
        ) {
          setDates(
            dates.map((date) => {
              if (
                date.outbound === settingDate &&
                date.inbound === newDateString
              ) {
                const updated = { outbound: date.outbound, inbound: '' };
                return updated;
              }
              return date;
            })
          );
          return;
        }
        setDates(
          dates.filter(
            (date) =>
              !(date.outbound === settingDate && date.inbound === newDateString)
          )
        );
        return;
      }
      const firstDate = dates.findIndex(
        (date) => date.outbound === settingDate && date.inbound === ''
      );
      if (firstDate >= 0) {
        setDates((dates) =>
          dates.map((date, index) => {
            if (index === firstDate) {
              const updatedDate = {
                outbound: date.outbound,
                inbound: newDateString,
              };
              return updatedDate;
            }
            return date;
          })
        );
      } else {
        setDates((dates) => [
          ...dates,
          { outbound: settingDate, inbound: newDateString },
        ]);
      }
    }
  };

  useEffect(() => {
    dispatch(setNewDates(dates));
  }, [dates, dispatch]);

  const renderDay = (
    date: Date | null,
    _selectedDate: Date | null,
    dayInCurrentMonth: boolean
  ): JSX.Element => {
    const nonNullDate = date ? date : new Date(1900);
    const dateTime = nonNullDate.getTime();
    const dateNormalised = new Date(nonNullDate.toDateString());
    // const dateString = `${dateNormalised.toISOString().substr(0, 10)}`;
    const dateString = normalisedDateString(dateNormalised);

    const todayDate = new Date(new Date().toDateString());
    const todayTime = todayDate.getTime();

    const isInPast = dateTime ? dateTime < todayTime : false;
    const isSelected = dates.find((date) => date.outbound === dateString)
      ?.outbound
      ? true
      : false;

    const isSettingDate = dateString === settingDate;
    const isReturnDate = dates.find(
      (date) => date.outbound === settingDate && date.inbound === dateString
    );

    const settingDateTime = settingDate ? new Date(settingDate).getTime() : 0;

    const returnDates = dates
      .filter((date) => date.outbound === settingDate && date.inbound !== '')
      .sort((a, b) => {
        const aTime = new Date(a.inbound).getTime();
        const bTime = new Date(b.inbound).getTime();
        return aTime - bTime;
      })
      .pop();

    const lastReturnDateTime = returnDates
      ? new Date(returnDates.inbound).getTime()
      : 0;

    const isRangeDate =
      !(isSettingDate || isReturnDate) &&
      dateTime > settingDateTime &&
      dateTime < lastReturnDateTime;

    const wrapperClassName = clsx(classes.dayWrapper, {
      [classes.highlight]: isSelected && !returnMode,
      [classes.leftHighlight]: returnMode && isSettingDate,
      [classes.rightHighlight]: returnMode && isReturnDate,
      [classes.rangeHighlight]: isRangeDate,
    });

    const dayClassName = clsx(classes.day, classes.dateElement, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth || isInPast,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && isSelected,
    });

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span>{date?.getDate()}</span>
        </IconButton>
      </div>
    );
  };

  const handleDeleteDate = (dateToDelete: DateType) => () => {
    setDates((dates) =>
      dates.filter(
        (date) =>
          !(
            date.outbound === dateToDelete.outbound &&
            date.inbound === dateToDelete.inbound
          )
      )
    );
  };

  return (
    <>
      <div className={classes.directionContainer}>
        <Typography variant="overline">
          {returnMode
            ? 'Select Possible Return Dates For'
            : 'Select Possible Departing Dates'}
        </Typography>
        {returnMode && <Typography>{settingDate}</Typography>}
      </div>

      <DatePicker
        value={selectedDate}
        onChange={handleChange}
        variant="static"
        label="FlightDateCalendar"
        disableToolbar={true}
        disablePast={true}
        openTo="date"
        renderDay={renderDay}
      />

      {tripType === 'return' && !returnMode && (
        <div className={classes.returnButtonContainer}>
          <Button
            disabled={!dates.length}
            onClick={() => {
              setReturnMode(true);
              setSettingDate(dates[0].outbound);
            }}
          >
            Set Return Dates
          </Button>
        </div>
      )}
      {returnMode && (
        <div className={classes.returnButtonContainer}>
          <Button
            onClick={() => {
              const nextUnsetDate = dates.find((date) => date.inbound === '');
              if (nextUnsetDate) {
                console.log('setting to ', nextUnsetDate.outbound);
                setSettingDate(nextUnsetDate.outbound);
              } else {
                dispatch(setNewDates(dates));
                closePopup();
              }
            }}
            disabled={
              dates.find(
                (date) => date.outbound === settingDate && date.inbound === ''
              )
                ? true
                : false
            }
          >
            {dates.find((date) => date.inbound === '')
              ? 'Set next dates'
              : 'Save Selection'}
          </Button>
        </div>
      )}
      {!returnMode && (
        <div className={classes.returnButtonContainer}>
          <Button
            onClick={() => {
              if (true) {
                dispatch(setNewDates(dates));
                closePopup();
              }
            }}
            disabled={dates.find((date) => date.outbound !== '') ? false : true}
          >
            Save Selection
          </Button>
        </div>
      )}
      {returnMode && (
        <Paper component="ul" className={classes.root}>
          {dates.map((date) => {
            const dateText = `${date.outbound}:${date.inbound}`;
            if (date.inbound) {
              return (
                <li key={dateText}>
                  <Chip
                    label={dateText}
                    onDelete={handleDeleteDate(date)}
                    className={classes.chip}
                  />
                </li>
              );
            }
            return <></>;
          })}
        </Paper>
      )}
    </>
  );
};

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  dayWrapper: {
    position: 'relative',
    margin: '1px',
  },
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: '0 1px',
    color: 'inherit',
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled,
  },
  highlightNonCurrentMonthDay: {
    color: '#676767',
  },

  highlight: {
    background: '#9933cc',
    color: theme.palette.common.white,
    borderRadius: '25%',
  },

  leftHighlight: {
    background: '#9933cc99',
    color: theme.palette.common.white,
    borderTopLeftRadius: '25%',
    borderBottomLeftRadius: '25%',
  },
  rightHighlight: {
    background: '#9933cc',
    color: theme.palette.common.white,
    borderTopRightRadius: '25%',
    borderBottomRightRadius: '25%',
  },
  rangeHighlight: {
    background: '#9933cc',
    color: theme.palette.common.white,
    opacity: '60%',
  },
  dateElement: {
    padding: '12px',
    overflow: 'visible',
    textAlign: 'center',
    borderRadius: '50%',
    border: '0',
    display: 'inline-flex',
    outline: '0',
    position: 'relative',
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'center',
    textDecoration: 'none',
    backgroundColor: 'transparent',
  },
  dateElementText: {
    width: '100%',
    display: 'flex',
    alignItems: 'inherit',
    justifyContent: 'inherit',
    fontSize: '0.75rem',
  },
  directionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: 1,
  },
  returnButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexBasis: 1,
    padding: '4px',
  },
}));
