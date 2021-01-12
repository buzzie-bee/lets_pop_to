import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

const StaticCalendar = ({ date }) => {
  const [selectedDate, handleChangeDate] = useState(date);
  // prettier-ignore
  return (

      <Paper style={{ overflow: 'hidden' }}>
        <DatePicker
          autoOk
          orientation="landscape"
          variant="static"
          disableToolbar={true}
          openTo="date"
          readOnly={true}
          value={selectedDate}
          onChange={handleChangeDate}
        />
      </Paper>
  );
};

export default StaticCalendar;
