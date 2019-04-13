export function getDayName(time: number): string {
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday ', 'Friday', 'Saturday'];
    return days[(new Date(time).getDay())];
}

export function getMonthName(time: number): string {
    const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[(new Date(time).getMonth())];
}
