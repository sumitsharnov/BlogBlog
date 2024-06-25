import { useEffect, useState } from "react";
import { formatDateTimeStamp } from "../../utils/formatDateTimeStamp";
import PropTypes from "prop-types";

const TimestampComponent = ({ timestamp, count }) => {
  const [dateInfo, setDateInfo] = useState(formatDateTimeStamp(timestamp));

  useEffect(() => {
    const updateRelativeTime = async () => {
      setDateInfo(formatDateTimeStamp(timestamp));
    };

    const intervalId = setInterval(updateRelativeTime, 60000); // Update every minute (60000 milliseconds)

    // Cleanup interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [timestamp, count]);

  return (
    <div key={count}>
      <p>
        {dateInfo.formattedDate}
        {` (${dateInfo.relativeTime})`}
      </p>
    </div>
  );
};

TimestampComponent.propTypes = {
  timestamp: PropTypes.string,
  count: PropTypes.number,
};

export default TimestampComponent;
