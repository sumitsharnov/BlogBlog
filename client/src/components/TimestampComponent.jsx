import React, { useEffect, useState } from 'react';
import { formatDateTimeStamp } from '../../utils/formatDateTimeStamp';

const TimestampComponent = ({ timestamp }) => {
    const [dateInfo, setDateInfo] = useState(formatDateTimeStamp(timestamp));

    useEffect(() => {
        const updateRelativeTime = () => {
            setDateInfo(formatDateTimeStamp(timestamp));
        };

        const intervalId = setInterval(updateRelativeTime, 60000); // Update every minute (60000 milliseconds)

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [timestamp]);

    return (
        <div>
            <p>{dateInfo.formattedDate}{` (${dateInfo.relativeTime})`}</p>
        </div>
    );
};

export default TimestampComponent;
