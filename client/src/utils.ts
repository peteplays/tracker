import { IData, ICoordinates } from './gmap';

export const displayTime = (time: string) => {
  const hour = +time.split(':')[0];
  const convertHour = hour > 12
    ? hour - 12
    : hour;
  const minutesSeconds = time.length === 8
    ? time.slice(3, -3)
    : time.slice(2, -3)

  return `${convertHour}:${minutesSeconds}${hour >= 12 ? 'pm' : 'am'}`;
};

export const displayDate = (date: string) => {
  const removeLeadingZero = (val: string) => val[0] === '0' ? val.slice(1) : val;
  const [year, month, day] = date.split('-');

  return `${removeLeadingZero(month)}/${removeLeadingZero(day)}/${year.slice(2)}`;
}

export const flattenData = (data: IData) => {
  return Object.entries(data).flatMap(([date, d]) =>
    Object.entries(d).map(([time, { lat, lng }]) => ({
      dateTime: `${displayDate(date)} - ${displayTime(time)}`,
      coords: { lat, lng }
    }))
  );
};

export const getAllCoordinates = (data: IData) => {
  return Object.entries(data).reduce((acc: ICoordinates[], [date, timeAndCoords]) => {
    const c = Object.entries(timeAndCoords).map(([time, coords]) => coords);
    acc.push(...c)

    return acc;
  }, []);
}
