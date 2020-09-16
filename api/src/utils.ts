const addLeadingZero = (val: string) => String(val).length === 1 ? `0${val}` : val;

export const getDate = (date?: string) => {
  const d = date ? new Date(date) : new Date();
  const lengthCheck = (c: number) => c.toString().length === 2 ? c : `0${c}`

  return `${d.getFullYear()}-${lengthCheck(d.getMonth())}-${lengthCheck(d.getDate())}`;
};

export const formatDate = (date: string) => {
  const [day, month, year] = date.split('-');

  return `20${year}-${addLeadingZero(month)}-${addLeadingZero(day)}`;
};

export const formatTime = (time: string) => {
  const [hours, minutes] = time.split('.');

  return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}`;
};

export const getLatLng = (latLng: string) => {
  const [lat, lng] = latLng.split(',');

  return {
    lat,
    lng,
  };
};
