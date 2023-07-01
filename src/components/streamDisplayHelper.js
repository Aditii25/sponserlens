export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getDate = (timestamp) => {
  const _start = new Date(parseInt(timestamp) * 1000);
  const start_date =
    String(_start.getDate()) +
    " " +
    String(monthNames[_start.getMonth()]) +
    ". " +
    String(_start.getFullYear()) +
    " " +
    String(_start.getHours()) +
    ":" +
    String(_start.getMinutes());

  return start_date;
};
