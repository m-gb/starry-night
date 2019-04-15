export function capitalize(text: string): string {
  const splitWords: string[] = text.split(' ');
  const uppercaseWords: string[] = splitWords.map(w => w.charAt(0).toUpperCase() + w.slice(1));
  return uppercaseWords.join(' ');
}

export function getDayName(time: number): string {
  const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday ', 'Friday', 'Saturday'];
  return days[(new Date(time).getDay())];
}

export function getMonthName(time: number): string {
  const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[(new Date(time).getMonth())];
}

export function getIconColor(weatherId: number): string {
  const blue: number[] = [300, 301, 302, 310, 311, 313, 314, 321, 500, 501, 502, 503, 504, 511, 520, 521, 522, 531, 611, 612, 615, 616, 620, 701];
  const yellow: number[] = [210, 211, 212, 221, 731, 761, 762, 800];
  if (blue.includes(weatherId)) {
    return 'wi-blue';
  }
  else if (yellow.includes(weatherId)) {
    return 'wi-yellow';
  }
  else {
    return 'wi-gray';
  }
}
