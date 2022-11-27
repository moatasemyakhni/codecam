// get yyyy-mm-dd hh:mm:ss from UTC timezone
export const getDateTime = (date: string): string => date.split('.')[0];

// get yyyy-mm-dd from UTC timezone
export const getDate = (date: string): string => date.split('T')[0];