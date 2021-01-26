import React from 'react';
import { Container, Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';

const Flights = () => {
  const params: any = useParams();
  const from = JSON.parse(params.from);
  const to = JSON.parse(params.to);
  const dates = JSON.parse(params.dates);

  return (
    <Container maxWidth="lg">
      <Paper>Hello There</Paper>
      <Paper>
        <pre>{JSON.stringify(from)}</pre>
      </Paper>
      <Paper>
        <pre>{JSON.stringify(to)}</pre>
      </Paper>
      <Paper>
        <pre>{JSON.stringify(dates)}</pre>
      </Paper>
    </Container>
  );
};

export default Flights;
