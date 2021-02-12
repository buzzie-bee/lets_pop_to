import React, { useEffect, useState } from 'react';
import {
  Badge,
  BadgeOrigin,
  Button,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import clsx from 'clsx';
import { setDates } from '../../../slice/inspireMeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { InspireMeStateType } from '../../../../../type';

export const NormalCalendar = ({
  tripType,
  closePopup,
}: {
  tripType: '' | 'oneWay' | 'return';
  closePopup: () => void;
}) => {
  const { dates: reduxDates }: InspireMeStateType = useSelector(
    (state: RootState) => state.inspireMe
  );

  const initialOutbound = reduxDates[0]
    ? new Date(new Date(reduxDates[0].outbound).toDateString())
    : null;
  const initialInbound = reduxDates[0]
    ? new Date(new Date(reduxDates[0].inbound).toDateString())
    : null;

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialOutbound
  );
  const [startDate, setStartDate] = useState<Date | null>(initialOutbound);
  const [endDate, setEndDate] = useState<Date | null>(initialInbound);
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleChange = (newDate: Date | null) => {
    if (!newDate) {
      return;
    }

    const newDateNormalised = new Date(newDate.toDateString());

    setSelectedDate(newDateNormalised);

    if (tripType === 'oneWay') {
      setStartDate(newDateNormalised);
      setEndDate(null);
      return;
    }

    if (!startDate) {
      setStartDate(newDateNormalised);
    } else if (endDate === null) {
      setEndDate(newDateNormalised);
    } else {
      setStartDate(newDateNormalised);
      setEndDate(null);
    }
  };

  useEffect(() => {
    console.log('setting dates');
    if (startDate) {
      const serializeableStart = `${startDate.toISOString().substr(0, 10)}`;
      const serializeableEnd = endDate
        ? `${endDate.toISOString().substr(0, 10)}`
        : '';

      dispatch(
        setDates([{ outbound: serializeableStart, inbound: serializeableEnd }])
      );
    }
  }, [startDate, endDate, dispatch]);

  const renderDay = (
    date: Date | null,
    _selectedDate: Date | null,
    dayInCurrentMonth: boolean
  ): JSX.Element => {
    const dayTime = date?.getTime();
    const todayTime = new Date(new Date().toDateString()).getTime();

    const startDateTime = startDate ? startDate.getTime() : 0;
    const endDateTime = endDate ? endDate.getTime() : 0;

    const isInPast = dayTime ? dayTime < todayTime : false;
    const isRangeStart = dayTime === startDateTime;
    const isRangeEnd = dayTime === endDateTime;
    const isInRange = dayTime
      ? dayTime > startDateTime && dayTime < endDateTime
      : false;

    const wrapperClassName = clsx(classes.dayWrapper, {
      [classes.leftHighlight]: isRangeStart,
      [classes.rightHighlight]:
        isRangeEnd || (isRangeStart && tripType === 'oneWay'),
      [classes.rangeHighlight]: isInRange,
    });

    const dayClassName = clsx(classes.day, classes.dateElement, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth || isInPast,
    });

    let badgeContent = '';
    let badgePosition: BadgeOrigin | undefined = {
      vertical: 'top',
      horizontal: 'left',
    };
    if (isRangeStart) {
      badgeContent = '🛫';
    } else if (isRangeEnd) {
      badgeContent = '🛬';
      badgePosition = { vertical: 'top', horizontal: 'right' };
    }

    return (
      <Badge badgeContent={badgeContent} anchorOrigin={badgePosition}>
        <div className={wrapperClassName}>
          <IconButton className={dayClassName}>
            <span>{date?.getDate()}</span>
          </IconButton>
        </div>
      </Badge>
    );
  };

  return (
    <>
      <div className={classes.directionContainer}>
        <Typography variant="overline">
          {tripType === 'return'
            ? 'Select Departing & Return Dates'
            : 'Select A Departure Date'}
        </Typography>
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
      <div className={classes.saveButtonContainer}>
        <Button
          onClick={() => {
            closePopup();
          }}
          disabled={
            (tripType === 'return' ? startDate : endDate) ? false : true
          }
        >
          Save Selection
        </Button>
      </div>
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
  leftHighlight: {
    background: '#9933cc',
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
  saveButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexBasis: 1,
    padding: '4px',
  },
}));
