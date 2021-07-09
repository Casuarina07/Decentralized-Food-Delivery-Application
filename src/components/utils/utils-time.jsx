export function getCurrentTime() {
  let newDate = new Date();

  let hour = newDate.getHours();
  let minutes = newDate.getMinutes();

  return `${hour}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`;
}
