import { format, formatDistanceToNow, parseISO } from 'date-fns';

export const useFormatDate = (timestamp) => {
    try{
        const date = parseISO(timestamp);
        const formattedDate = format(date, 'PPpp'); // 'PPpp' provides a formatted date and time string.
        const relativeTime = formatDistanceToNow(date, { addSuffix: true });
        return { formattedDate, relativeTime };
    }catch(err){
        console.error(err);
        return { formattedDate: '', relativeTime: '' };
    }
    
  };