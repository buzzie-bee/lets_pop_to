import './DestinationDivider.css';

export const DestinationDivider = ({ stops }: { stops: number }) => {
  const renderStops = () => {
    if (stops === 0) {
      return;
    } else if (stops === 1) {
      return <div className="dividerStop" />;
    } else if (stops === 2) {
      return (
        <>
          <div className="dividerStop d33" />
          <div className="dividerStop d66" />
        </>
      );
    }
  };

  return (
    <div className="destinationDivider">
      <div className="dividerStart" />
      {renderStops()}
      <div className="dividerEnd" />
    </div>
  );
};
