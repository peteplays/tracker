export const getDate = (date?: string) => {
  const d = date ? new Date(date) : new Date();
  const lengthCheck = (c: number) => c.toString().length === 2 ? c : `0${c}`

  return `${d.getFullYear()}-${lengthCheck(d.getMonth())}-${lengthCheck(d.getDate())}`;
};
