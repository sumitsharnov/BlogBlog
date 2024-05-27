import { format, formatDistanceToNow, parseISO, isToday, isYesterday, differenceInDays } from 'date-fns';


export const formatDateTimeStamp = (timestamp) => {
    try {
        const date = parseISO(timestamp);
        let formattedDate;
        const relativeTime = formatDistanceToNow(date, { addSuffix: true });

        if (isToday(date)) {
            formattedDate = `Today at ${format(date, 'p')}`;
        } else if (isYesterday(date)) {
            formattedDate = `Yesterday at ${format(date, 'p')}`;
        } else {
            const daysAgo = differenceInDays(new Date(), date);
            formattedDate = `${daysAgo} days ago at ${format(date, 'p')}`;
        }

        return { date, formattedDate, relativeTime };
    } catch (err) {
        console.error(err);
        return { date: null, formattedDate: '', relativeTime: '' };
    }
};